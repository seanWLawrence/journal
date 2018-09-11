// @flow strict

import { getLoginForm, getHomePage } from '../database/root';

/**
 * Simply imports and exports the root routes, since
 * they aren't using their own 'mini Express router' like the
 * pages routes are for example
 */
export { getLoginForm, getHomePage };
