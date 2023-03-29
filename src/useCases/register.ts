import { env } from '@/env';
import { UsersRepository } from '@/repositories/usersRepository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

interface registerUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ name, email, password }: registerUserRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError(email);
    }

    const passwordHash = await hash(password, env.HASH_SALT);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return {
      user,
    };
  }
}
