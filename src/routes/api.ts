import {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import * as z from 'zod';
import { v1 } from 'uuid';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

const sqlite3Verbose = sqlite3.verbose();

async function openDb(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  return open({
    filename: path.join(__dirname, '../../database/Todo.db'),
    driver: sqlite3.Database,
  });
}

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
  server.post(
    '/todos',
    async (request: FastifyRequest, reply: FastifyReply) => {
      // console.log(request.body);
      // // const title = request.body;
      // console.log(title);
      const parseResult = createTodoBodySchema.safeParse(request.body);
      if (parseResult.success === false) {
        reply.status(400).send(parseResult.error);
        return;
      }
      // create new object as Todo base on request.body

      const todoToInsert: Todo = {
        id: v1(),
        title: parseResult.data.title,
        completed: false,
      };

      // send data in DB

      const db = await openDb();

      const result = await db.run(
        'INSERT INTO todo(id, title, completed) VALUES (:id, :title, :completed)',
        {
          ':id': todoToInsert.id,
          ':title': todoToInsert.title,
          ':completed': todoToInsert.completed,
        }
      );

      // then return it
      return reply.status(200).send(todoToInsert);
    }
  );

  done();
}

//use .push in body ???????????

// const User = z.object({
//   username: z.string(),
// });