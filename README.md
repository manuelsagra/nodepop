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

### Users

Users can register making a POST to `/users` with the following parameters in the body:

* **name** Name of the user
* **email** E-mail of the user
* **password** Password of the user

To authenticate and retrieve a JWT token, a POST request to `/users/authenticate` should be used, with the following parameters in the body:

* **email** E-mail of the user
* **password** Password of the user

### Ads

Using the previous token, there are two more API entry points. Making a GET request to `/ads` retrieves a list of ads, with the following parameters:

* **token** A JWT token obtained via a request to `/users/authenticate` (Required)
* **selling** True for looking for items for sale and false for retrieving wanted items (Optinal)
* **price** Either an exact price or a price range (priceA-priceB for a range, priceA- for prices greater or equal and -priceA for prices lower or equal) (Optional)
* **name** The start of the item name, case insensitive (Optional) 
* **tag** Tag used in the ad (Optional)

To see the list of tags used, you can make a GET request to `/ads/tags` with no parameters needed.

## TODO
* iodocs
* ESLint