/**
 * Type imports
 */
import { Request, Response, NextFunction } from 'express';

/**
 * ErnoError interface for use in onError
 */
declare interface ErrnoError extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
}

const wrongPath = {
	status: 404,
	data: {},
	message: 'This path does not exist',
};

const wrongParameters = {
	status: 400,
	data: {},
	message: 'This path does not exist with the supplied parameters',
};

const internalError = {
	status: 500,
	data: {},
	message: 'There was an internal error',
};

export default function errorJSON(
	err: ErrnoError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	/**
	 * Defaults to Express' internal error handling
	 * if headers were already sent
	 */
	if (res.headersSent) {
		return next(err);
	}
	/**
	 * 404 error JSON response
	 */
	res.status(404).json(wrongPath);
	/**
	 * 400 error JSON response
	 */
	res.status(400).json(wrongParameters);
	/**
	 * Internal error JSON response
	 */
	res.status(500).json(internalError);
	return next();
}
