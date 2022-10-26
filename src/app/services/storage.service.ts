import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get(key: string) {
    const data = localStorage.getItem(key) || '{}';
    return JSON.parse(data);
  }

  set(key: string, value: any = {}) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }
}
