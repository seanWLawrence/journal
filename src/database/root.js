// @flow strict

/**
 * Types imports
 */
import type { $Request, $Response } from 'express';

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
