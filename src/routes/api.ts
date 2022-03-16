import {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import * as z from 'zod';
import { v1 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const createTodoBodySchema = z.object({
  title: z.string(),
});

export function apiRoutes(
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (error?: FastifyError) => void
): void {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ hello: 'world' });
  });
  server.post('/todos', (request: FastifyRequest, reply: FastifyReply) => {
    // console.log(request.body);
    // // const title = request.body;
    // console.log(title);
    const parseResult = createTodoBodySchema.safeParse(request.body);
    if (parseResult.success === false) {
      reply.status(400);
      return;
    }
    // create new object as Todo base on request.body

    const todoToInsert: Todo = {
      id: v1(),
      title: parseResult.data.title,
      completed: false,
    };
    // send data in DB

    // then return it
    reply.status(200).send(todoToInsert);
  });

  done();
}

//use .push in body ???????????

// const User = z.object({
//   username: z.string(),
// });
