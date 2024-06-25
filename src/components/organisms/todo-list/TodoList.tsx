"use client";

import { Input } from "@/components/atoms";
import { TodoItem } from "@/components/molecules";
import React, { useEffect, useState } from "react";

interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todo");
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!newTodo.trim()) {
        alert("Todo cannot be empty");
        return;
      }
      if (todos.some((todo) => todo.todo === newTodo.trim())) {
        alert("Duplicate todo");
        return;
      }
      const newTodoItem = {
        id: Date.now().toString(),
        todo: newTodo.trim(),
        isCompleted: false,
        createdAt: new Date(),
      };
      await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodoItem),
      });
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo(todo.todo);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleAddTodo}
        className="mb-4 w-full"
      />
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter todos"
        className="mb-4 w-full"
      />
      {filteredTodos.length ? (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
          />
        ))
      ) : (
        <p>No result. Create a new one instead!</p>
      )}
    </div>
  );
};

export { TodoList };
