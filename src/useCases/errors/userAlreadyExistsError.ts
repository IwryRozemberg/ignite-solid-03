export class UserAlreadyExistsError extends Error {
  constructor(mensagem: string) {
    super(`E-mail [${mensagem}] already exists another user.`);
  }
}
