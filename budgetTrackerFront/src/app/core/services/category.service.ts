import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../features/transactions/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Récupère toutes les catégories disponibles.
   */
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }
}
