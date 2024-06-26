import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firestore";

const todosCollection = collection(db, "todos");

export async function GET() {
  const querySnapshot = await getDocs(todosCollection);
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { todo, isCompleted, createdAt } = await req.json();
  const newTodo = { todo, isCompleted, createdAt: new Date(createdAt) };
  const docRef = await addDoc(todosCollection, newTodo);
  return NextResponse.json({ id: docRef.id, ...newTodo });
}
