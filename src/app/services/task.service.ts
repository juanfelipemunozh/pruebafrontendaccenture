import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _storage: Storage | null = null;
  private TASKS_KEY = 'tasks';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getTasks(): Promise<Task[]> {
    await this.ensureStorage();
    const tasks = await this._storage?.get(this.TASKS_KEY);
    return (tasks || []).sort((a: Task, b: Task) => b.createdAt - a.createdAt);
  }

  async saveTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    await this._storage?.set(this.TASKS_KEY, tasks);
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const filtered = tasks.filter(t => t.id !== id);
    await this._storage?.set(this.TASKS_KEY, filtered);
  }

  async deleteAllTasks(): Promise<void> {
    await this.ensureStorage();
    await this._storage?.remove(this.TASKS_KEY);
  }

  private async ensureStorage() {
    if (!this._storage) {
      await this.init();
    }
  }
}
