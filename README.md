# Backend

- [Backend](#backend)
	- [Running the application](#running-the-application)
		- [Requirements](#requirements)
		- [Enviroment variables](#enviroment-variables)
		- [Dependencies](#dependencies)
		- [Run the application](#run-the-application)
			- [Development](#development)
			- [Production](#production)
	- [API reference](#api-reference)

![node-current](https://img.shields.io/node/v/ssh2)

## Running the application

### Requirements

**Node.js** xx.x.x or newer is required. Latest LTS is recommended.

### Enviroment variables

Configure `.env` file to project root

	# Database variables
	DB_HOST=your-database-host
	DB_USER=your-database-user
	DB_PASS=your-database-password
	DB_NAME=your-database-name

### Dependencies

Install dependencies for development enviroment

	$ npm install

> Note that in production environment you can do `$ npm install --only=prod`.

### Run the application

#### Development

Run the main application `server.js` located in `./js_files/`

	$ node js_files/server.js

#### Production

Run as PM2 process

	$ pm2 start js_files/server.js

> Subsequently control pm2 apps by invoking assigned id or name, e.g. `$ pm2 start 0`

## API reference

> Nginx configuration is underway, expect  port redirecting in the future

Base URL

`http://206.189.16.14/`

### Get all rooms

All rooms

`http://206.189.16.14:8080/getAllRooms`

> If you encounter issues with CORS, fetch static mockup json from backup endpoint

`http://206.189.16.14:3001/json`
