# Bundlerbot
Bundlerbot is a small node script using the [probot](https://github.com/probot/probot) library to help the bundler team manage our repos.

## Requirements
* redis 3.2
* node 8.1.2

## Development
Bundlerbot interacts with Github using [Github Apps](https://developer.github.com/apps/), when developing bundlerbot on a local machine you will need to setup a new integration. Refer to the [Githul documentation](https://developer.github.com/apps/building-integrations/setting-up-a-new-integration/) for more info.

Note: It's recommend to create the integration on your Github own account and create a new repository to test on.

Probot uses localtunnel.me to allow Github to make requests to bundlerbot running on your local machine. Generate a random 16 char string and use `<random-string>.localtunnel.me` as the webook url.

Once you have setup the integration you are able to run probot. You will need to record the app id, webhook secret and the private key.

To start probot use the following command, replace the placeholders with the relevent information from the integration you have setup.

````
probot run --port <port> --app <appid> -P <private-key> --secret <webhook-secret> -t <localtunnel.me-url> ./index.js
```

## Code Of Conduct

Everyone interacting in the Bundler project’s codebases, issue trackers, chat rooms, and mailing lists is expected to follow the [Bundler code of conduct](https://github.com/bundler/bundlerbot/blob/master/CODE_OF_CONDUCT.md).

## Contributing
If you'd like to contribute to Bundler, that's awesome, and we <3 you.

While some Bundler contributors are compensated by Ruby Together, the project maintainers make decisions independent of Ruby Together. As a project, we welcome contributions regardless of the author’s affiliation with Ruby Together.

## Supporting

<a href="https://rubytogether.org/"><img src="https://rubytogether.org/images/rubies.svg" width="150"></a><br>
<a href="https://rubytogether.org/">Ruby Together</a> pays some Bundler maintainers for their ongoing work. As a grassroots initiative committed to supporting the critical Ruby infrastructure you rely on, Ruby Together is funded entirely by the Ruby community. Contribute today <a href="https://rubytogether.org/developers">as an individual</a> or (better yet) <a href="https://rubytogether.org/companies">as a company</a> to ensure that Bundler, RubyGems, and other shared tooling is around for years to come.
