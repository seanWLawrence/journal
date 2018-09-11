// @flow strict

declare module 'passport-local' {
  declare class Passport {
    Strategy(): void;
  }
  declare export default Passport;
}
