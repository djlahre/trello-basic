import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe((taskData) => {
      this.taskData = taskData;
    });
  }

  taskData: any = {};

  ngOnInit(): void {}
}
