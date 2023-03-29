import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialError } from './errors/invalidCredentialsError';

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    usersRepository.create({
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
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it('should be not able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    usersRepository.create({
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
