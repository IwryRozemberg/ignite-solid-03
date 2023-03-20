import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface registerRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: registerRequest) {
  const passwordHash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    throw new Error(`E-mail [${email}] already exists`);
  }

  await prisma.user.create({
    data: { name, email, password_hash: passwordHash },
  });
}
