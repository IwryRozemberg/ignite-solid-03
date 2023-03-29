import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';
import { GetUserProfileUseCase } from './getUserProfile';

let repository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(repository);
  });

  it('should be able to get user profile', async () => {
    const { id: userId } = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123321', 6),
    });

    const { user } = await sut.execute({
      userId,
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should be not able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
