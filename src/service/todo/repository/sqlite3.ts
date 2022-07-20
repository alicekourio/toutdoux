import { open, Database } from 'sqlite';
import path from 'path';
import sqlite3 from 'sqlite3';
import type { Todo } from '../interfaces';

export async function createOne(todoToCreate: Todo): Promise<Todo> {
  const db = await openDb();

  const result = await db.run(
    'INSERT INTO todo(id, title, completed) VALUES (:id, :title, :completed)',
    {
      ':id': todoToCreate.id,
      ':title': todoToCreate.title,
      ':completed': todoToCreate.completed,
    }
  );
  return todoToCreate;
}

async function openDb(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  return open({
    filename: path.join(process.cwd(), 'database/database.sqlite'),
    driver: sqlite3.Database,
  });
}
