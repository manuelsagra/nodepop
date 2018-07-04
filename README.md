# Nodepop API

This is an API for an app for selling second hand items. Right now it only shows preloaded items to registered users.

## Installation

Download the repository and install dependencies executing:

```shell
npm i
```

You also need MongoDB installed. You can download the binaries for your platform (Windows, Mac, Linux) and in the main directory, you should execute:

```shell
mkdir data/db
./bin/mongod --dbpath ./data/db --directoryperdb
```

## Starting the server

To start the server you should execute:

```shell
npm run start
```

If you want to start with debug info you need to install nodemon (`npm i -g nodemon`) and then execute:

```shell
npm run debug
```

## API documentation

TODO

## TODO

* DB init script (empty tables, indexes (user's email, ad fields, sample data)
* Filters (name, tags, type)
* Validations (email)
* Users (registration, jwt)
* Sorting
* Documentation (Readme, index, iodocs)
* Clustering

* i18n
* ESLint