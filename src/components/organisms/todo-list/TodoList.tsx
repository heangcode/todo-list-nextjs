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
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/todo");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        toast.error("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddOrUpdateTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (!newTodo.trim()) {
        toast.error("Todo cannot be empty");
        return;
      }
      if (todos.some((todo) => todo.todo === newTodo.trim())) {
        toast.error("Duplicate todo");
        return;
      }

      setLoading(true);

      try {
        if (editTodoId) {
          // Update existing todo
          const updatedTodo = {
            id: editTodoId,
            todo: newTodo.trim(),
            isCompleted: false,
            createdAt: new Date(),
          };
          await fetch(`/api/todo/${editTodoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTodo),
          });
          setTodos(
            todos.map((todo) => (todo.id === editTodoId ? updatedTodo : todo))
          );
          toast.success("Todo updated successfully");
          setEditTodoId(null);
        } else {
          // Add new todo
          const newTodoItem = {
            todo: newTodo.trim(),
            isCompleted: false,
            createdAt: new Date(),
          };
          const response = await fetch("/api/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodoItem),
          });
          const addedTodo = await response.json();
          setTodos([...todos, addedTodo]);
          toast.success("Todo added successfully");
        }
        setNewTodo("");
      } catch (error) {
        toast.error("Failed to add/update todo");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

      setLoading(true);

      try {
        await fetch(`/api/todo/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo),
        });
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        toast.success(
          `Todo marked as ${
            updatedTodo.isCompleted ? "complete" : "incomplete"
          }`
        );
      } catch (error) {
        toast.error("Failed to update todo");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      await fetch(`/api/todo/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo(todo.todo);
      setEditTodoId(id);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-[16px] shadow-md p-10">
      <Toaster position="top-right" reverseOrder={false} />
      <span className="text-[24px] font-bold flex items-center justify-center">
        TODO LIST APPLICATION
      </span>
      <div className="flex flex-col items-start space-y-4">
        <span className="text-xs text-gray-400">
          {filteredTodos.length} of {todos.length} todos
        </span>

        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddOrUpdateTodo}
          placeholder="Add todo"
          className="mb-4 w-full"
        />
        <div className="h-[1px] bg-gray-700 w-full" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search..."
          className="mb-4 w-full"
        />
        {loading && <div className="loader">Loading...</div>}
        {filteredTodos.length === 0 && !loading && (
          <div>No result. Create a new one instead!</div>
        )}
        {filteredTodos.length > 0 &&
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo.todo}
              isCompleted={todo.isCompleted}
              onToggleComplete={() => handleToggleComplete(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={() => handleEdit(todo.id)}
            />
          ))}
      </div>
    </div>
  );
};

export { TodoList };
