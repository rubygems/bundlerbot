const redis = require('redis').createClient(process.env.REDIS_URL);

module.exports = robot => {
  const welcomed_user_key = 'welcomed_users';

  robot.on('pull_request.opened', async function(event) {
    const github = await robot.auth(event.payload.installation.id);
    const pr_author = event.payload.pull_request.user.login;

    if (await userHasBeenWelcomed(pr_author))
      return;

    robot.log("handling open pull request: ", event.payload.number);
    postWelcomeMessage(event, github, pr_author);
  });

  async function postWelcomeMessage(event, github, author) {
    const body = await getWelcomeMessage(event, github);
    const params = event.issue({body});

    github.issues.createComment(params).then(function() {
      redis.rpush(welcomed_user_key, author);
    });
  };

  async function getWelcomeMessage(event, github) {
    const path = '.github/welcome_message.md'
    const params = event.repo({path})

    const res = await github.repos.getContent(params);
    return new Buffer(res.data.content, 'base64').toString();
  };

  async function userHasBeenWelcomed(user) {
    return new Promise((resolve, _) => { 
      redis.lrange(welcomed_user_key, 0, -1, function(err, users) {
        resolve(users.indexOf(user) > -1);
      });
    });
  };
}
