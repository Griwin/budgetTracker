import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../../features/transactions/models/transaction.model';
import { Summary } from '../../features/dashboard/models/summary.model';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private readonly http: HttpClient) {}

  /**
   * Récupère les transactions du user connecté.
   */
  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${environment.apiBaseUrl}/api/transactions`
    );
  }

  create(payload: {
    amount: number;
    type: 'income' | 'expense';
    date: string;
    category_id: number;
  }) {
    return this.http.post(
      `${environment.apiBaseUrl}/api/transactions`,
      payload
    );
  }

  /**
   * Récupère le résumé (income/expense/balance) du user connecté.
   */
  getSummary(): Observable<Summary> {
    return this.http.get<Summary>(`${environment.apiBaseUrl}/api/summary`);
  }
}
