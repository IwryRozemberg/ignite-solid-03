import { registerUseCase } from '@/useCases/register';
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
    await registerUseCase({ email, name, password });
    return reply.status(201).send();
  } catch (error) {
    return reply.status(409).send();
  }
}
