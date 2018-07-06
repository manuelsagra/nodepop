# Nodepop API

A node.js REST API for selling second hand stuff. Right now it only shows preloaded items to registered users.

## Installation

You need a recent [node.js](https://nodejs.org/) installation to make it work. 

Clone or download the repository and install dependencies executing:

```shell
npm i
```

You also need to have [MongoDB](https://www.mongodb.com/) installed. You can [download the binaries for your operating system](https://www.mongodb.com/download-center?jmp=homepage#community) (Windows, Mac, Linux) and then execute this in the directory after decompression:

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

If you want to start the server with debug info you need to execute:

```shell
npm run debug
```

In both modes a cluster is started with as many nodes as the number of CPU cores. Once started, you can see the documentation and a sample app pointing your browser to [http://localhost:3000/](http://localhost:3000/).

## API documentation

Error messages are available either in *english* (default) or *spanish*. To use one of this languages, you can use the `lang` query parameter or the browser standard `Accept-Language` header and the appropiate ISO code (`en`, `es`).

### Users

#### POST /users

Used to register a user. It uses the following parameters in the body:

* **name** - Name of the user *(Required)*
* **email** - E-mail of the user *(Required)*
* **password** - Password of the user *(Required)*

#### POST /users/authenticate

To authenticate and retrieve a JWT token. The following parameters in the body are needed:

* **email** - E-mail of the user *(Required)*
* **password** - Password of the user *(Required)*

### Ads

#### GET /ads

Using the previous token, retrieves a list of ads, with the following parameters:

* **token** - A JWT token obtained via a POST request to `/users/authenticate` *(Required)*
* **selling** - True for looking for items for sale and false for retrieving wanted items *(Optional)*
* **price** - Either an exact price or a price range: `priceFrom-priceTo` for a range (e.g.: 50-120), `priceFrom-` for prices greater or equal than priceFrom (e.g.: 60-) or `-priceTo` for prices lower or equal than priceTo (e.g.: -1000) *(Optional)*
* **name** - The start of the item name, case insensitive *(Optional)*
* **tag** - Tag used in the ad *(Optional)*
* **skip** - Number of items to skip *(Optional)*
* **limit** - Number of items to show *(Optional)*
* **sort** - Sort results by this field (name, selling, price or tag) *(Optional)*

#### GET /ads/tags

To see the list of tags used in the ads. It just need one parameter:

* **token** - A JWT token obtained via a POST request to `/users/authenticate` *(Required)*