# Charlie Chatterbot

### Machine Learning Slackbot + Data Visualizations
Charlie the Chatterbot is a Machine Learning Chatbot that integrates with Slack.  Place the Slack bot into your channel
and the bot will be automatically trained on all of the conversations in that particular channel.
Over time, the bot will learn and represent the culture of the Slack channel.  All of the data that the bot learns
from is also analyzed through Alchemy's sentiment analysis, and displayed in graph form.

We are live at [uai.website](uai.website)!

### Table of Contents
 - [Installation](#installation)
 - [Contributing](#contributing)
 - [Authors](#authors)

### Installation
If you need to set up a Python dev environment, check out this [guide](https://github.com/imminent-tuba/thesis/wiki/Python-Environment-Setup) in our wiki.

From the root directory,
```
npm install
pip install -r requirememnts.txt
```

### Deployment
Our deployment strategy is explained in more detail in our [wiki](https://github.com/imminent-tuba/thesis/wiki/Deployment).

#### INITIALIZING THE DB
This project uses mysql for the node/express server, and Mongodb for the chat bot. Both must be installed and running.

#### initialize the mysql database with the schema file
```
$ mysql -u root < server/Schema.sql

```
if your mysql instance needs a password add -p <password> to this command

#### start mongo
```
$ mongod
```

It is recommended that each of the following commands is run in it's own terminal window.
This will help with development flow as you will be able to watch webpack, the server and the bot at the same time.

#### 1. Run webpack to package the front-end code
```
$ npm run webpack
```
#### 2. Run the server using nodemon
```
$ nodemon server/server.js
```
#### 3. Run the chat bot
```
$ nodemon server/chatterbot/chatterbot_entry.js
```

### config files
the following files must be in the server/config folder

AlchemyApiKey.js
```
module.exports = <ALCHEMY_API_KEY>;
```
botKey.js
```
module.exports = <SLACK_BOT_KEY>;
```
pythonSettings.js
```
module.exports = {
  mode: 'text',
  pythonPath: '<PATH_TO_PYTHON>',
  args: [0, 'test', 0],
};
```
winston.js
set logging levels - uncomment lines for loggly integration.
```
const winston = require('winston');
require('winston-loggly');

module.exports = (logger) => {
  logger.level = 'info';
  // logger.add(winston.transports.Loggly, {
  //   token: '<LOGGLY_API_TOKEN>',
  //   subdomain: 'your loggly subdomain',
  //   tags: ['Winston-NodeJS'],
  //   json: true,
  // });
  // logger.add(require('winston-daily-rotate-file'), {
  //   filename: 'server.log',
  //   dirname: './logs',
  //   prepend: true
  // });
};

```

### Contributing
```

```

### Authors
* [Jin Bok](https://www.linkedin.com/in/jinbok) - Product Owner
* [Mark Tyneway](https://www.linkedin.com/in/marktyneway) - Scrum Master
* [Jovani Marinez Rico](www.linkedin.com/in/jovanirico) - Developer Specialist
* [Josh Wentworth](https://www.linkedin.com/in/joshwentworth) - Developer Specialist

### License
MIT

##### Issues
[![Stories in Ready](https://badge.waffle.io/imminent-tuba/thesis.svg?label=ready&title=Ready)](http://waffle.io/imminent-tuba/thesis)


##### Waffle.io Throughput Graph. We have been working really hard on this project
[![Throughput Graph](https://graphs.waffle.io/imminent-tuba/thesis/throughput.svg)](https://waffle.io/imminent-tuba/thesis/metrics/throughput)
