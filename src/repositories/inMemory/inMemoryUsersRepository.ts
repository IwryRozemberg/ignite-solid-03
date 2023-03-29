import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { UsersRepository } from '../usersRepository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      password_hash: data.password_hash,
      email: data.email,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }
}
