import { UsersRepository } from '@/repositories/usersRepository';
import { compare } from 'bcryptjs';
import { InvalidCredentialError } from './errors/invalidCredentialsError';

interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError();
    }

    return { user };
  }
}
