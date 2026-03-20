import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs 
} from '@angular/fire/firestore';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private collectionName = 'categories';

  constructor(private firestore: Firestore) {}

  async getCategories(): Promise<Category[]> {
    const categoriesCollection = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(categoriesCollection);
    return snapshot.docs.map(doc => doc.data() as Category);
  }

  async saveCategory(category: Category): Promise<void> {
    const categoryDoc = doc(this.firestore, `${this.collectionName}/${category.id}`);
    await setDoc(categoryDoc, category);
  }

  async deleteCategory(id: string): Promise<void> {
    const categoryDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(categoryDoc);
  }
}
