import { Button } from "@/components/atoms";
import React from "react";
import { DeleteIcon } from "../../../../public/icon";

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
  <div className="flex items-center justify-between p-2 border-b hover:bg-gray-200">
    <span className={isCompleted ? "line-through" : ""}>{todo}</span>
    <div>
      <Button
        onClick={onToggleComplete}
        className="bg-blue-500 text-white mr-2"
      >
        {isCompleted ? "Mark as Incomplete" : "Complete"}
      </Button>
      <Button onClick={onEdit} className="bg-yellow-500 text-white mr-2">
        <DeleteIcon />
      </Button>
      <Button onClick={onDelete} className="bg-red-500 text-white">
        <DeleteIcon />
      </Button>
    </div>
  </div>
);

export { TodoItem };
