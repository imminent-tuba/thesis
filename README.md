# Charlie Chatterbot

uai.website

### Machine Learning Slackbot + Data Visualizations
Charlie the Chatterbot learns more and more over time.  It can be [difficult](http://blogs.microsoft.com/blog/2016/03/25/learning-tays-introduction/) to keep track of what a machine learning bot is learning, so we run the conversations through sentiment analysis and display live graphs on the "personality" of the bot.
Currently, we support Slack messenger.

### Installation
If you need to set up a Python dev environment, check out this [guide](https://github.com/imminent-tuba/thesis/wiki/Python-Environment-Setup) in our wiki.

From the root directory,
```
npm install
pip install -r requirememnts.txt
```

### Usage

### Deployment
Our deployment strategy is explained in more detail in our [wiki](https://github.com/imminent-tuba/thesis/wiki/Deployment).

### Contributing
```

```

#### INITIALIZING THE DB
This project uses mysql for the node/express server, and Mongodb for the chatterbot. Both must be installed and running.

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

#### 1. Run webpack to package the front-end code
```
$ npm run webpack
```
#### 2. Run the server using nodemon
```
$ nodemon server/server.js
```
#### 3. Run the chatterbot
```
$ nodemon server/chatterbot/chatterbot_entry.js
```

### Authors

### License
MIT

##### Issues
[![Stories in Ready](https://badge.waffle.io/imminent-tuba/thesis.svg?label=ready&title=Ready)](http://waffle.io/imminent-tuba/thesis)


##### Waffle.io Throughput Graph. We have been working really hard on this project
[![Throughput Graph](https://graphs.waffle.io/imminent-tuba/thesis/throughput.svg)](https://waffle.io/imminent-tuba/thesis/metrics/throughput)
