import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';

export async function appRoutes(instance: FastifyInstance) {
  instance.post('/users', register);
}
