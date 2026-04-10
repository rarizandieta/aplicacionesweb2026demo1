import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitOfMeasure } from '../interfaces/inventory';

@Injectable({ providedIn: 'root' })
export class UnitOfMeasureService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<UnitOfMeasure[]> { return this.http.get<UnitOfMeasure[]>(`${this.apiUrl}/units-of-measure`); }
  getById(id: number): Observable<UnitOfMeasure> { return this.http.get<UnitOfMeasure>(`${this.apiUrl}/units-of-measure/${id}`); }
  create(data: Partial<UnitOfMeasure>): Observable<UnitOfMeasure> { return this.http.post<UnitOfMeasure>(`${this.apiUrl}/units-of-measure`, data); }
  update(id: number, data: Partial<UnitOfMeasure>): Observable<UnitOfMeasure> { return this.http.put<UnitOfMeasure>(`${this.apiUrl}/units-of-measure/${id}`, data); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/units-of-measure/${id}`); }
}
