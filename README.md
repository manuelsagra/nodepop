# Nodepop API

This is an API for an app that is used for selling second hand items. Right now it only shows preloaded items to registered users.

## Installation

Download the repository and install dependencies executing:

```shell
npm i
```

You also need to have MongoDB installed. You can download the binaries for your operating system (Windows, Mac, Linux) and then you need to execute this in the main directory:

```shell
mkdir data/db
./bin/mongod --dbpath ./data/db --directoryperdb
```

To insert some sample data in the database, go back to this project directory and execute:

```shell
npm run installdb
```

## Starting the server

To start the server you should execute:

```shell
npm run start
```

If you want to start the server with debug info you need to install nodemon (`npm i -g nodemon`) and then execute:

```shell
npm run debug
```

In both modes a cluster is started with as many nodes as the number of CPU cores.

## API documentation

TODO

## TODO

* indexes (user's email, ad fields)
* Validations (email)
* Users (registration, jwt)

* iodocs
* i18n
* ESLint