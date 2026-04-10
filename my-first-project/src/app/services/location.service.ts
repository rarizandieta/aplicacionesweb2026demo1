import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/inventory';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Location[]> { return this.http.get<Location[]>(`${this.apiUrl}/locations`); }
  getById(id: number): Observable<Location> { return this.http.get<Location>(`${this.apiUrl}/locations/${id}`); }
  create(data: Partial<Location>): Observable<Location> { return this.http.post<Location>(`${this.apiUrl}/locations`, data); }
  update(id: number, data: Partial<Location>): Observable<Location> { return this.http.put<Location>(`${this.apiUrl}/locations/${id}`, data); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/locations/${id}`); }
}
