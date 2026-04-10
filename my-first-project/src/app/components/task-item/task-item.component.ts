import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {

  @Input() task!: Task;

  @Output() toggled = new EventEmitter<number>();
  @Output() deleted = new EventEmitter<number>();

  onToggle(): void {
    this.toggled.emit(this.task.id);
  }

  onDelete(): void {
    this.deleted.emit(this.task.id);
  }
}
