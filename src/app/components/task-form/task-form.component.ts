import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { ColumnTypes, TaskInfo } from 'src/app/types';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: TaskInfo = {
    id: '',
    title: '',
    description: '',
    column: <any>'NONE',
  };

  @Input() isEditMode: boolean = false;

  @Output() onSave = new EventEmitter();

  initialColumnVal = '';
  isColumnChanged = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    if (this.isEditMode) {
      this.initialColumnVal = this.task.column;
    }
  }

  taskInfoForm: any;

  ngOnInit(): void {
    this.taskInfoForm = this.formBuilder.group({
      id: this.task.id,
      title: [
        this.task.title,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      description: [
        this.task.description,
        [Validators.required, Validators.minLength(25)],
      ],
      column: [this.task.column, [Validators.required, this.columnValidator()]],
    });
  }

  columnValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValidColumn = Object.values(ColumnTypes).includes(control.value);
      return !isValidColumn ? { value: control.value } : null;
    };
  }

  onSubmit = () => {
    if (this.isEditMode) {
      if (this.initialColumnVal !== this.taskInfoForm.value.column) {
        this.isColumnChanged = true;
      }
      this.taskService.updateTask(
        this.taskInfoForm.value,
        this.isColumnChanged
      );
    } else {
      this.taskService.addTask(this.taskInfoForm.value);
    }
    this.activeModal.close('Save click');
    this.taskInfoForm.reset();
  };

  onDelete = () => {
    this.taskService.deleteTask(this.taskInfoForm.value);
    this.activeModal.close('Save click');
    this.taskInfoForm.reset();
  };
}
