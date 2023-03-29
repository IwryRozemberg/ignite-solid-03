import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

let repository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(repository);
  });

  it('should be able register user', async () => {
    const { user } = await sut.execute({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '321123',
    });

    expect(user).toHaveProperty('id');
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to register an user with same e-mail', async () => {
    await sut.execute({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '321123',
    });

    await expect(() =>
      sut.execute({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: '321123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should hash user password upon registration', async () => {
    const password = '123321';

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password,
    });

    expect(user).toHaveProperty('password_hash');

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
