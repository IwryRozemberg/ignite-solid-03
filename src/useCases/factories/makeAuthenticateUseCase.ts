import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
