import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  getDocs,
  writeBatch
} from '@angular/fire/firestore';
import { Task } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private collectionName = 'tasks';

  constructor(private firestore: Firestore) {}

  async getTasks(): Promise<Task[]> {
    const tasksCollection = collection(this.firestore, this.collectionName);
    const q = query(tasksCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Task);
  }

  async saveTask(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${task.id}`);
    await setDoc(taskDoc, task);
  }

  async deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(taskDoc);
  }

  async deleteAllTasks(): Promise<void> {
    const tasks = await this.getTasks();
    const batch = writeBatch(this.firestore);
    tasks.forEach(task => {
      const taskDoc = doc(this.firestore, `${this.collectionName}/${task.id}`);
      batch.delete(taskDoc);
    });
    await batch.commit();
  }
}
