import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

<<<<<<< HEAD
=======
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase";

>>>>>>> 13d27364ff715a4bc0ab36adb77d0f92b2a70510
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

<<<<<<< HEAD
=======
export async function saveEventToFirestore(event: { title: string; description: string }) {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "events"), event);
    return docRef.id;
  } catch (error) {
    throw error;
  }
}

>>>>>>> 13d27364ff715a4bc0ab36adb77d0f92b2a70510
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  // Calcula el producto punto
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);

  // Calcula la magnitud del vector A
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));

  // Calcula la magnitud del vector B
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  // Evita la división por cero
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  // Devuelve la similitud del coseno
  return dotProduct / (magnitudeA * magnitudeB);
}