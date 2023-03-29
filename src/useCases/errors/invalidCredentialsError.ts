export class InvalidCredentialError extends Error {
  constructor() {
    super('E-mail or password incorrect.');
  }
}
