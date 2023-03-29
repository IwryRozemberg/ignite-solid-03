import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository';
import { RegisterUseCase } from '../register';

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  return registerUseCase;
}
