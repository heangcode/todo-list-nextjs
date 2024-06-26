import { NextRequest, NextResponse } from "next/server";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firestore";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { todo, isCompleted } = await req.json();
  const todoDoc = doc(db, "todos", id);
  await updateDoc(todoDoc, { todo, isCompleted });
  return NextResponse.json({ message: "Todo updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const todoDoc = doc(db, "todos", id);
  await deleteDoc(todoDoc);
  return NextResponse.json({ message: "Todo deleted successfully" });
}
