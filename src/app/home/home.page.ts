import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonCheckbox, IonButton, IonIcon, IonInput,
  IonFab, IonFabButton, IonBadge, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { ScrollingModule, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, helpCircleOutline, listOutline } from 'ionicons/icons';
import { Task, Category } from '../models/models';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { RemoteConfigService } from '../services/remote-config.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule, RouterLink, ScrollingModule, CdkVirtualForOf,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonLabel, IonCheckbox, IonButton, IonIcon, IonInput,
    IonFab, IonFabButton, IonBadge, IonSelect, IonSelectOption
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  tasks: Task[] = [];
  categories: Category[] = [];
  newTaskTitle: string = '';
  selectedCategoryId: string = '';
  filterCategoryId: string = 'all';
  showDeleteAll: boolean = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private remoteConfig: RemoteConfigService
  ) {
    addIcons({ addOutline, trashOutline, helpCircleOutline, listOutline });
  }

  async ionViewWillEnter() {
    await this.loadData();
    this.showDeleteAll = await this.remoteConfig.getBoolean('show_delete_all');
  }

  async loadData() {
    this.tasks = await this.taskService.getTasks();
    this.categories = await this.categoryService.getCategories();
    console.log('HomePage data loaded:', { tasks: this.tasks.length, categories: this.categories.length });
  }

  async addTask() {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: this.newTaskTitle,
      completed: false,
      createdAt: Date.now(),
      categoryId: this.selectedCategoryId || undefined
    };

    await this.taskService.saveTask(newTask);
    console.log('Task added:', newTask);
    this.newTaskTitle = '';
    this.selectedCategoryId = '';
    await this.loadData();
  }

  async toggleTask(task: Task) {
    task.completed = !task.completed;
    await this.taskService.saveTask(task);
    await this.loadData();
  }

  async deleteTask(id: string) {
    await this.taskService.deleteTask(id);
    await this.loadData();
  }

  async deleteAll() {
    await this.taskService.deleteAllTasks();
    await this.loadData();
  }

  get filteredTasks() {
    if (this.filterCategoryId === 'all') {
      return this.tasks;
    }
    return this.tasks.filter(t => t.categoryId === this.filterCategoryId);
  }

  onFilterChange() {
    console.log('Filter changed to:', this.filterCategoryId);
  }

  getCategoryName(categoryId?: string) {
    if (!categoryId) return 'Sin categoría';
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Sin categoría';
  }

  trackByFn(index: number, item: Task) {
    return item.id;
  }
}
