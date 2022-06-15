import {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as todoController from '../controllers/todo';

export function apiRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
): void {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ hello: 'world' });
  });
  server.post('/todos', todoController.createTodo);

  done();
}

//use .push in body ???????????

// const User = z.object({
//   username: z.string(),
// });
