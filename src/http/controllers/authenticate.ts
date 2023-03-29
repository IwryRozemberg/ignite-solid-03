import { InvalidCredentialError } from '@/useCases/errors/invalidCredentialsError';
import { makeAuthenticateUseCase } from '@/useCases/factories/makeAuthenticateUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    return reply.status(200).send({ message: 'Authenticated', user });
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
