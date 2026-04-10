import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/inventory';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Category[]> { return this.http.get<Category[]>(`${this.apiUrl}/categories`); }
  getById(id: number): Observable<Category> { return this.http.get<Category>(`${this.apiUrl}/categories/${id}`); }
  create(data: Partial<Category>): Observable<Category> { return this.http.post<Category>(`${this.apiUrl}/categories`, data); }
  update(id: number, data: Partial<Category>): Observable<Category> { return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, data); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/categories/${id}`); }
}
