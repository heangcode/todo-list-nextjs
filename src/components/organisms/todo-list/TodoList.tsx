"use client";

import { Input } from "@/components/atoms";
import { TodoItem } from "@/components/molecules";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

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
        toast.error("Todo cannot be empty");
        return;
      }
      if (todos.some((todo) => todo.todo === newTodo.trim())) {
        toast.error("Duplicate todo");
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
      toast.success("Todo added successfully");
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
      toast.success(
        `Todo marked as ${updatedTodo.isCompleted ? "complete" : "incomplete"}`
      );
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted successfully");
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
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-[16px] shadow-md p-10">
      <Toaster position="top-right" reverseOrder={false} />
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleAddTodo}
        placeholder="Add todo"
        className="mb-4 w-full"
      />
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
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
