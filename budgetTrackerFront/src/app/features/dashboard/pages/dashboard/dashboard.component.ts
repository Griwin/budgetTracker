import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../../../../core/services/transaction.service';
import { Summary } from '../../models/summary.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  summary: Summary | null = null;
  errorMessage: string | null = null;

  constructor(private readonly transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getSummary().subscribe({
      next: (data) => (this.summary = data),
      error: () => (this.errorMessage = 'Impossible de charger le résumé.'),
    });
  }

  /**
   * Convertit centimes -> euros (si ton back stocke en centimes).
   */
  toEuros(amount: number): number {
    return amount / 100;
  }
}
