import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository';
import { RegisterUseCase } from '@/useCases/register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);
    await registerUseCase.execute({ email, name, password });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(409).send();
  }
}
