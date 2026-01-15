import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function addEventToFirebase(event: Record<string, any>) {
  // Normaliza los datos para Firestore
  const eventData = {
    ...event,
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(collection(db, "calendarEvents"), eventData);
  return docRef.id;
}
