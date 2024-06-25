interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
}

let todos: Todo[] = [];

export const getTodos = () => todos;

export const addTodo = (todo: Todo) => {
  todos.push(todo);
};

export const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...updatedTodo } : todo
  );
};

export const deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
};
