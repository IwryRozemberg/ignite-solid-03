import { UsersRepository } from '@/repositories/usersRepository';
import { hash } from 'bcryptjs';

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
      throw new Error(`E-mail [${email}] already exists`);
    }

    const passwordHash = await hash(password, 6);

    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
