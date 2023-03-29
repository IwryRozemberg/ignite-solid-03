import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

const usersRepository = new InMemoryUsersRepository();
const registerUseCase = new RegisterUseCase(usersRepository);

describe('Register Use Case', () => {
  it('should be able register user', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '321123',
    });

    expect(user).toHaveProperty('id');
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to register an user with same e-mail', async () => {
    await expect(() =>
      registerUseCase.execute({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: '321123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should hash user password upon registration', async () => {
    const password = '123321';

    const { user } = await registerUseCase.execute({
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
