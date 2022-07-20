import { FastifyReply, FastifyRequest } from 'fastify';
import * as z from 'zod';
import * as todoService from '../../service/todo';

const createTodoBodySchema = z.object({
  title: z.string(),
});

export async function createTodo(request: FastifyRequest, reply: FastifyReply) {
  const parseResult = createTodoBodySchema.safeParse(request.body);
  if (parseResult.success === false) {
    reply.status(400).send(parseResult.error);
    return;
  }
  const todo = await todoService.createTodo({ title: parseResult.data.title });

  // then return it
  return reply.status(200).send(todo);
}
