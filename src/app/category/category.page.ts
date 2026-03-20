import { Component } from '@angular/core';
// Removed unnecessary imports
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonButton, IonIcon, IonInput, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, saveOutline, arrowBackOutline, pencilOutline } from 'ionicons/icons';
import { Category } from '../models/models';
import { CategoryService } from '../services/category.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
    IonLabel, IonButton, IonIcon, IonInput, IonButtons, IonBackButton
  ]
})
export class CategoryPage {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {
    addIcons({ addOutline, trashOutline, saveOutline, arrowBackOutline, pencilOutline });
  }

  async ionViewWillEnter() {
    await this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
    console.log('Categories loaded:', this.categories);
  }

  async saveCategory() {
    if (!this.newCategoryName.trim()) return;

    const category: Category = {
      id: this.editingCategory ? this.editingCategory.id : uuidv4(),
      name: this.newCategoryName,
      color: 'primary' // Default color
    };

    await this.categoryService.saveCategory(category);
    console.log('Category saved:', category);
    this.newCategoryName = '';
    this.editingCategory = null;
    await this.loadCategories();
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.newCategoryName = category.name;
  }

  async deleteCategory(id: string) {
    await this.categoryService.deleteCategory(id);
    await this.loadCategories();
  }

  cancelEdit() {
    this.editingCategory = null;
    this.newCategoryName = '';
  }
}
