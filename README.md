# Nodepop API

REST API for selling second hand items in an app written in node.js. Right now it only shows preloaded items to registered users.

## Installation

You need a recent node.js installation to make it work. 

Clone or download the repository and install dependencies executing:

```shell
npm i
```

You also need to have MongoDB installed. You can download the binaries for your operating system (Windows, Mac, Linux) and then execute this in the directory after decompression:

```shell
mkdir data/db
./bin/mongod --dbpath ./data/db --directoryperdb
```

To insert some sample data in the database, go back to this project directory and execute:

```shell
npm run installdb
```

You can audit the code anytime running [eslint](https://eslint.org/) with the following command:

```shell
npm run lint
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

Error messages are available either in *english* (default) or *spanish*. To use one of this languages, you can use the `lang` query parameter or the browser standard `Accept-Language` header and the appropiate ISO code (`en`, `es`).

### Users

Users can register making a POST to `/users` with the following parameters in the body:

* **name** - Name of the user
* **email** - E-mail of the user
* **password** - Password of the user

To authenticate and retrieve a JWT token, a POST request to `/users/authenticate` should be used, with the following parameters in the body:

* **email** - E-mail of the user
* **password** - Password of the user

### Ads

Using the previous token, there are two more API entry points. Executing a GET request to `/ads` retrieves a list of ads, with the following parameters:

* **token** - A JWT token obtained via a request to `/users/authenticate` (Required)
* **selling** - True for looking for items for sale and false for retrieving wanted items (Optinal)
* **price** - Either an exact price or a price range (priceA-priceB for a range, priceA- for prices greater or equal and -priceA for prices lower or equal) (Optional)
* **name** - The start of the item name, case insensitive (Optional) 
* **tag** - Tag used in the ad (Optional)

To see the list of tags used in the ads, you can make a GET request to `/ads/tags` passing the token as a parameter.

## TODO
* iodocs
* Post new ads