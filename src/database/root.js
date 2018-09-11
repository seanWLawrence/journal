// @flow strict

/**
 * Types imports
 */
import type { $Request, $Response } from 'express';

/**
 * Displays basic JSON response with information about the app
 * @param {Request} req
 * @param {Response} res
 */
export function getHomePage(req: $Request, res: $Response) {
  res.status(200).json({
    status: 'Success',
    data: {
      app: 'journal',
    },
    message: 'Successfully retrieved the app data',
  });
}

/**
 * Displays a login form at the '/login' route
 * @param {Request} req
 * @param {Response} res
 */
export function getLoginForm(req: $Request, res: $Response) {
  res.status(200).send(`
  <form action="/login" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username"/><br/>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password"/>
    </div>
    <div>
      <input type="submit" value="Submit"/>
    </div>
  </form>
`);
}
