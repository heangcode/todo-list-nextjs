import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://localhost:3001/todos";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { todo, isCompleted } = await req.json();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo, isCompleted }),
  });
  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return NextResponse.json({ message: "Todo deleted successfully" });
}
