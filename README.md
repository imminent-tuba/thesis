# Imminent Tuba Thesis Project!

### Chat Bot Data Visualization
Talk to our chatbot and our website will update live with data based on the conversations you hold with it.
Our chatbot will be found on Slack and possibly Facebook Messenger.

### Installation
```
on ubuntu:
  sudo apt-get install python-dev

python setup.py develop
```
If you are on Mac and do not have Python 3 installed, install it with homebrew:
```
brew python3
```


To set up the Python dev environment, use virtualenv and virtualenvwrapper
```
$ pip install virtualenv
$ pip install virtualenvwrapper

```
Then place these 3 lines in your shell startup file of choice (.bashrc)
Can be found in /etc
```
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
source /usr/local/bin/virtualenvwrapper.sh
```
Then go to the root of the application directory and run
```
mkvirtualenv -r requirements.txt -a </path/to/directory> --python=</path/to/python3> thesis
```
If you do not know your path to Python 3, run:
```
which python3
```
This creates a virtual environment for Python and installs the dependencies from inside requirements.txt

### Usage

### Deployment
We are using an Amazon Linux AMI EC2 instance on Amazon Web Services with CodeDeploy to host our application but
other deployment options should work as well.
Once the instance is deployed, SSH into the server using the key-pair then run:
```
sudo yum install gcc-c++ make
sudo yum install openssl-devel
sudo yum install git
git clone git://github.com/nodejs/node
cd node
git checkout v6.0.0
./configure
make
sudo make install
```
This will install node on the AWS instance. 
Now we must add it to sudo's path
```
sudo su
vim /etc/sudoers
```
Once inside the file, scroll down and change the line
```
Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin
```
to this:
```
Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin
```
Now to install npm
```
cd
git clone https://github.com/npm/npm.git
cd npm
sudo make install
```
Now the instance has node and npm installed
The instance needs MongoDB. Install it with [this](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-amazon/) guide.

##### Ubuntu
Installing NodeJS on Ubuntu, follow [this](http://www.murvinlai.com/nodejs--mongodb-on-aws.html)

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
### Authors

### License
MIT

##### Issues
[![Stories in Ready](https://badge.waffle.io/imminent-tuba/thesis.svg?label=ready&title=Ready)](http://waffle.io/imminent-tuba/thesis)


##### Waffle.io Throughput Graph. We have been working really hard on this project
[![Throughput Graph](https://graphs.waffle.io/imminent-tuba/thesis/throughput.svg)](https://waffle.io/imminent-tuba/thesis/metrics/throughput)
