import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialError } from './errors/invalidCredentialsError';

let repository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(repository);
  });

  it('should be able to authenticate', async () => {
    repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123321', 6),
    });

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123321',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be not able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it('should be not able to authenticate with wrong password', async () => {
    repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '666666',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
