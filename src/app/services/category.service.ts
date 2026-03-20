import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _storage: Storage | null = null;
  private CATEGORIES_KEY = 'categories';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getCategories(): Promise<Category[]> {
    await this.ensureStorage();
    const categories = await this._storage?.get(this.CATEGORIES_KEY);
    return categories || [];
  }

  async saveCategory(category: Category): Promise<void> {
    const categories = await this.getCategories();
    const index = categories.findIndex(c => c.id === category.id);
    if (index > -1) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    await this._storage?.set(this.CATEGORIES_KEY, categories);
  }

  async deleteCategory(id: string): Promise<void> {
    const categories = await this.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    await this._storage?.set(this.CATEGORIES_KEY, filtered);
  }

  private async ensureStorage() {
    if (!this._storage) {
      await this.init();
    }
  }
}
