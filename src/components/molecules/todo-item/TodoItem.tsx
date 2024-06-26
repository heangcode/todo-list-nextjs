import { Button } from "@/components/atoms";
import React from "react";
import { DeleteIcon, EditIcon } from "../../../../public/icon";

interface TodoItemProps {
  todo: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isCompleted,
  onToggleComplete,
  onDelete,
  onEdit,
}) => (
  <div className="flex items-center justify-between p-2 border-b">
    <span
      className={`flex-1 ${
        isCompleted ? "line-through" : ""
      } overflow-hidden overflow-ellipsis whitespace-nowrap`}
    >
      {todo}
    </span>
    <div className="flex items-center space-x-2">
      <Button onClick={onToggleComplete} className="bg-blue-500 text-white">
        {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
      </Button>
      <Button
        onClick={onEdit}
        className="text-white bg-blue-600 flex items-center space-x-2 hover:bg-blue-800 hover:text-white rounded-lg"
      >
        <EditIcon />
        <span>Edit</span>
      </Button>
      <Button
        onClick={onDelete}
        className="text-white bg-red-600 flex items-center space-x-2 capitalize hover:bg-red-800 hover:text-white rounded-lg"
      >
        <DeleteIcon />
        <span>Remove</span>
      </Button>
    </div>
  </div>
);

export { TodoItem };
