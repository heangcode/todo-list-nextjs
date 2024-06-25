import { NextRequest, NextResponse } from "next/server";
import { deleteTodo, updateTodo } from "@/data/todos";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { todo, isCompleted } = await req.json();
  updateTodo(id, { todo, isCompleted });
  return NextResponse.json({ message: "Todo updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  deleteTodo(id);
  return NextResponse.json({ message: "Todo deleted successfully" });
}
