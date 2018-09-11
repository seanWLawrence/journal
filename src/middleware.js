// @flow strict

import type { $Request, $Response, NextFunction } from 'express';

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

const internalError = {
  status: 500,
  data: {},
  message: 'There was an internal error',
};

export function errorJSON(
  err: ErrnoError,
  req: $Request,
  res: $Response,
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
   * Internal error JSON response
   */
  res.status(500).json(internalError);

  next();
}
