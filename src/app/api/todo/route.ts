import { NextRequest, NextResponse } from "next/server";
import { addTodo, getTodos } from "@/data/todos";

export async function GET() {
  const todos = getTodos();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { id, todo, isCompleted, createdAt } = await req.json();
  addTodo({ id, todo, isCompleted, createdAt });
  return NextResponse.json({ message: "Todo added successfully" });
}
