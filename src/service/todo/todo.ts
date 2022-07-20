import { v1 } from 'uuid';
import * as todoRepository from './repository';
import type { Todo } from './interfaces';

type TodoToCreate = Omit<Todo, 'id' | 'completed'>;

export async function createTodo(todoToCreate: TodoToCreate): Promise<Todo> {
  // create new object as Todo base on request.body

  const todoToInsert: Todo = {
    id: v1(),
    title: todoToCreate.title,
    completed: false,
  };

  return todoRepository.createOne(todoToInsert);
}

// send data in DB
