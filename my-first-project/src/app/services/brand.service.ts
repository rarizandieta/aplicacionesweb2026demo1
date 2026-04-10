import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/inventory';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Brand[]> { return this.http.get<Brand[]>(`${this.apiUrl}/brands`); }
  getById(id: number): Observable<Brand> { return this.http.get<Brand>(`${this.apiUrl}/brands/${id}`); }
  create(data: Partial<Brand>): Observable<Brand> { return this.http.post<Brand>(`${this.apiUrl}/brands`, data); }
  update(id: number, data: Partial<Brand>): Observable<Brand> { return this.http.put<Brand>(`${this.apiUrl}/brands/${id}`, data); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/brands/${id}`); }
}
