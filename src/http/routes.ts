import { FastifyInstance } from 'fastify';
import { authenticate } from './controllers/authenticate';
import { register } from './controllers/register';

export async function appRoutes(instance: FastifyInstance) {
  instance.post('/sessions', authenticate);
  instance.post('/users', register);
}
