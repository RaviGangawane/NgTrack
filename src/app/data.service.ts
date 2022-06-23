import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  timestamp: string;
  accuracy: string;
  altitude: string;
  altitudeAccuracy: string;
  heading: string;
  latitude: string;
  longitude: string;
  speed: string;
}
export interface Coords {
  accuracy: string;
  altitude: string;
  altitudeAccuracy: string;
  heading: string;
  latitude: string;
  longitude: string;
  speed: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'locations');
    // console.log('notesRef ===>', notesRef);
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  getNoteById(id: number): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: Note) {
    // console.log('note', note);
    const notesRef = collection(this.firestore, 'locations');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  // updateNote(note: Note) {
  //   const noteDocRef = doc(this.firestore, `notes/${note.id}`);
  //   return updateDoc(noteDocRef, { timestamp: note.timestamp, position: note.position });
  // }
}
