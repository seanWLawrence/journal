// @flow strict

import http from 'http';
import { Server } from 'http';
import debug from 'debug';
import Api from './Api';

/**
 * ErnoError interface for use in onError
 */
declare interface ErrnoError extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
}

/**
 * Logs that we're about to start the server
 */
const logger = debug('api:startup');

/**
 * Initializes the Api class
 */
const app: Api = new Api();

/**
 * Sets default port constant value
 */
const DEFAULT_PORT: number = 3000;

/**
 * Sets default port constant value
 */
const port: number = process.env.PORT
	? parseInt(process.env.PORT, 10)
	: DEFAULT_PORT;

/**
 * Sets HTTP server with the Express instance to a variable
 */
const server: Server = http.createServer(app.express);

/**
 * Starts the server
 */
server.listen(port);

/**
 * Logs errors when they occur
 */
server.on('error', onError);

/**
 * Logs that the server is running
 */
server.on('listening', onListening);

/**
 * Handles errors effectively
 * If system error on listen function, throw
 * If
 * @param {Error} error
 */
function onError(error: ErrnoError): void {
	/**
	 * Throw error if there was a problem with the system's listen function
	 */
	if (error.syscall !== 'listen') throw error;

	/**
	 * Gets the port value to pass in the EADDRINUSE error log
	 * to specifiy which port is already being used
	 */
	let bind: string =
		typeof port === 'string' ? `Pipe ${port}` : `Port ${port.toString()}`;

	/**
	 * Logs EACCES and EADDRINUSE errors and exits, and throw on other error types
	 */
	switch (error.code) {
		case 'EACCES':
			// eslint-disable-next-line
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			// eslint-disable-next-line
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Logs that the server is running and what port it is running on
 */
function onListening(): void {
	let addr = server.address();
	let bind: string =
		typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	logger(`Listening on ${bind}`);
}

export default server;
