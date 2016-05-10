# Charlie Chatterbot

ec2-52-11-162-224.us-west-2.compute.amazonaws.com:1337  ---  52.11.162.224

### Machine Learning Slackbot + Data Visualizations
Charlie the Chatterbot learns more and more over time.  It can be [difficult](http://blogs.microsoft.com/blog/2016/03/25/learning-tays-introduction/) to keep track of what a machine learning bot is learning, so we run the conversations through sentiment analysis and display live graphs on the "personality" of the bot.
Currently, we support Slack messenger.

### Installation
If you need to set up a Python dev environment, check out this [guide](https://github.com/imminent-tuba/thesis/wiki/Python-Environment-Setup) in our wiki.

From the root directory,
```
npm install
```

### Usage

### Deployment
Our deployment strategy is explained in more detail in our [wiki](https://github.com/imminent-tuba/thesis/wiki/Deployment).

### Contributing
To start the server using the babel transpiler and nodemon, run
```
$ npm run start
```
The front end code is packaged with webpack. It is nice to have two terminal windows open with nodemon
running in one and webpack running in the other. This way you can see errors in either process.
To start webpack, run
```
$ npm run webpack
```

#### INITIALIZING THE DB
mysql, need to make a table called chatanalysis
```
$ mysql -u root < server/Schema.sql
```

### Authors

### License
MIT

##### Issues
[![Stories in Ready](https://badge.waffle.io/imminent-tuba/thesis.svg?label=ready&title=Ready)](http://waffle.io/imminent-tuba/thesis)


##### Waffle.io Throughput Graph. We have been working really hard on this project
[![Throughput Graph](https://graphs.waffle.io/imminent-tuba/thesis/throughput.svg)](https://waffle.io/imminent-tuba/thesis/metrics/throughput)
