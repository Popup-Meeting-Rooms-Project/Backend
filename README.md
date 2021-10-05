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
		- [Latest room status](#latest-room-status)

## Running the application

### Requirements

| Tool    | Version |
| ------- | ------- |
| Node.js | -       |
| MariaDB | -       |

**Node.js** xx.x.x or newer is required. Latest LTS is recommended.

**MariaDB** xx.x.x or newer is required. For another database; install approriate `npm package` and configure `path-to-directory`

### Enviroment variables

Configure `.env` file located in `path-to-directory`.

	# Database variables
	DB_HOST=your-database-host
	DB_USER=your-database-user
	DB_PASS=your-database-password
	DB_NAME=your-database-name

### Dependencies

Install dependencies for development enviroment

	npm install

### Run the application

#### Development

Run the main application `.js` located in `path-to-directory`

	node .js

#### Production

Run as PM2 process

	pm2 start app.js

## API reference

Base URL

`http://206.189.16.14/`

### Latest room status

Fetch latest room updates with GET request

`http://206.189.16.14/json`