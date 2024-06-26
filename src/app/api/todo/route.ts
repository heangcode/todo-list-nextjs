import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://localhost:3001/todos";

export async function GET() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { id, todo, isCompleted, createdAt } = await req.json();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, todo, isCompleted, createdAt }),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
