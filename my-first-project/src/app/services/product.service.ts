import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/inventory';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Product[]> { return this.http.get<Product[]>(`${this.apiUrl}/products`); }
  getById(id: number): Observable<Product> { return this.http.get<Product>(`${this.apiUrl}/products/${id}`); }
  create(data: Partial<Product>): Observable<Product> { return this.http.post<Product>(`${this.apiUrl}/products`, data); }
  update(id: number, data: Partial<Product>): Observable<Product> { return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/products/${id}`); }
}
