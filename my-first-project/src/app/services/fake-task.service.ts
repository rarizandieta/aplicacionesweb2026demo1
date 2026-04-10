import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class FakeTaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Revisar correos pendientes', completed: false },
    { id: 2, title: 'Preparar presentación del proyecto', completed: false },
    { id: 3, title: 'Actualizar documentación', completed: true },
    { id: 4, title: 'Reunión con el equipo', completed: false },
    { id: 5, title: 'Enviar reporte semanal', completed: false },
    { id: 5, title: 'Enviar reporte semanal', completed: false },
    { id: 5, title: 'Enviar reporte semanal', completed: false },
    { id: 5, title: 'Enviar reporte semanal', completed: false },
    { id: 5, title: 'Enviar reporte semanal', completed: false },
    { id: 5, title: 'Enviar reporte semanal', completed: false }
  ];

  getTasks(): Observable<Task[]> {
    return of([...this.tasks]);
  }

  toggleTask(id: number): Observable<Task[]> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    return of([...this.tasks]);
  }

  deleteTask(id: number): Observable<Task[]> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of([...this.tasks]);
  }
}
