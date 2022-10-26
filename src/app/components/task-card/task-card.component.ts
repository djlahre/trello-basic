import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskInfo } from 'src/app/types';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: TaskInfo = {
    id: '',
    title: '',
    description: '',
    column: <any>'',
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    const formRef = this.modalService.open(TaskFormComponent);
    formRef.componentInstance.task = this.task;
    formRef.componentInstance.isEditMode = true;
  }
}
