import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css'],
})
export class TaskColumnComponent implements OnInit {
  @Input() columnName: string = 'Column Name';
  @Input() tasks: any[] = [];

  columnHeaderClasses = '';
  dataColumn = '';

  subs = new Subscription();

  constructor(
    private dragulaService: DragulaService,
    private taskService: TaskService,
    private modalService: NgbModal
  ) {
    this.subs.add(
      this.dragulaService
        .dropModel('CARDS')
        .subscribe(({ source, sourceModel, target, targetModel, item }) => {
          const colName1 = source.getAttribute('id');
          const colName2 = target.getAttribute('id');

          item.column = colName2;

          this.taskService.updateTaskByDrag(
            colName1,
            sourceModel,
            colName2,
            targetModel
          );
        })
    );
  }

  open(column: string) {
    const formRef = this.modalService.open(TaskFormComponent);
    formRef.componentInstance.task.column = column;
    formRef.componentInstance.isEditMode = true;
  }

  ngOnInit(): void {
    if (this.columnName === 'To Do') {
      this.columnHeaderClasses = 'bg-warning';
      this.dataColumn = 'TODO';
    } else if (this.columnName === 'Doing') {
      this.columnHeaderClasses = 'bg-info';
      this.dataColumn = 'DOING';
    } else if (this.columnName === 'Done') {
      this.columnHeaderClasses = 'bg-success text-white';
      this.dataColumn = 'DONE';
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
