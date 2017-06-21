module.exports = robot => {
  robot.on('pull_request.opened', async function(event) {
    const github = await robot.auth(event.payload.installation.id);

    robot.log("handling open pull request: ", event.payload.number);
    postWelcomeMessage(event, github);
  });

  async function postWelcomeMessage(event, github) {
    const body = await getWelcomeMessage(event, github);
    const params = event.issue({body})

    github.issues.createComment(params);
  };

  async function getWelcomeMessage(event, github) {
    const path = '.github/welcome_message.md'
    const params = event.repo({path})

    const res = await github.repos.getContent(params);
    return new Buffer(res.data.content, 'base64').toString();
  };
}
