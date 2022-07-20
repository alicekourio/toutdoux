import { v1 } from 'uuid';
import { open, Database } from 'sqlite';
import path from 'path';
import sqlite3 from 'sqlite3';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

type TodoToCreate = Omit<Todo, 'id' | 'completed'>;

export async function createTodo(todoToCreate: TodoToCreate): Promise<Todo> {
  // create new object as Todo base on request.body

  const todoToInsert: Todo = {
    id: v1(),
    title: todoToCreate.title,
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
  return todoToInsert;
}

async function openDb(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  return open({
    filename: path.join(process.cwd(), 'database/database.sqlite'),
    driver: sqlite3.Database,
  });
}
