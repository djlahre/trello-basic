import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import ObjectID from 'bson-objectid';
import { ColumnTypes, TaskInfo } from '../types';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private storageService: StorageService) {
    if (Object.keys(this.storageService.get('taskData')).length > 0) {
      this.taskData = this.storageService.get('taskData');
    }
  }

  taskData = {
    todoList: <TaskInfo[]>[],
    doingList: <TaskInfo[]>[],
    doneList: <TaskInfo[]>[],
  };

  getTasks(): Observable<any> {
    return of(this.taskData);
  }

  addTaskHelper(task: TaskInfo): void {
    if (task.column === ColumnTypes.TODO) {
      this.taskData.todoList.push(task);
    } else if (task.column === ColumnTypes.DOING) {
      this.taskData.doingList.push(task);
    } else if (task.column === ColumnTypes.DONE) {
      this.taskData.doneList.push(task);
    }
  }

  addTask(task: TaskInfo): void {
    task.id = ObjectID().toHexString();
    this.addTaskHelper(task);
    this.storageService.set('taskData', this.taskData);
  }

  updateTaskHelper(taskList: any[], task: TaskInfo): any[] {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === task.id) {
        taskList[i] = task;
      }
    }

    return taskList;
  }

  updateTask(task: TaskInfo, isColumnChanged: boolean = false): void {
    if (isColumnChanged) {
      this.deleteTaskHelper(task);
      this.addTaskHelper(task);
    } else {
      if (task.column === ColumnTypes.TODO) {
        this.taskData.todoList = this.updateTaskHelper(
          this.taskData.todoList,
          task
        );
      } else if (task.column === ColumnTypes.DOING) {
        this.taskData.doingList = this.updateTaskHelper(
          this.taskData.doingList,
          task
        );
      } else if (task.column === ColumnTypes.DONE) {
        this.taskData.doneList = this.updateTaskHelper(
          this.taskData.doneList,
          task
        );
      }
    }

    this.storageService.set('taskData', this.taskData);
  }

  updateTaskByDrag(
    colName1: any,
    colData1: any,
    colName2: any,
    colData2: any
  ): void {
    if (colName1 === ColumnTypes.TODO) {
      this.taskData.todoList = colData1;
    }
    if (colName1 === ColumnTypes.DOING) {
      this.taskData.doingList = colData1;
    }
    if (colName1 === ColumnTypes.DONE) {
      this.taskData.doneList = colData1;
    }

    if (colName2 === ColumnTypes.TODO) {
      this.taskData.todoList = colData2;
    }
    if (colName2 === ColumnTypes.DOING) {
      this.taskData.doingList = colData2;
    }
    if (colName2 === ColumnTypes.DONE) {
      this.taskData.doneList = colData2;
    }

    this.storageService.set('taskData', this.taskData);
  }

  deleteTaskHelper(task: TaskInfo): void {
    this.taskData.todoList = this.taskData.todoList.filter(
      (tk) => tk.id !== task.id
    );
    this.taskData.doingList = this.taskData.doingList.filter(
      (tk) => tk.id !== task.id
    );
    this.taskData.doneList = this.taskData.doneList.filter(
      (tk) => tk.id !== task.id
    );
  }

  deleteTask(task: TaskInfo): void {
    this.deleteTaskHelper(task);
    this.storageService.set('taskData', this.taskData);
  }
}
