import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TransactionService } from '../../../../core/services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit {
  /** Colonnes affichées dans la table */
  displayedColumns: string[] = ['date', 'type', 'category', 'amount', 'actions'];

  /** DataSource Material pour la table */
  dataSource = new MatTableDataSource<Transaction>([]);

  isLoading = false;
  errorMessage: string | null = null;

  constructor(private readonly transactionService: TransactionService) {}

  ngOnInit(): void {
    this.load();
  }

  /**
   * Charge la liste des transactions depuis l'API.
   */
  load(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading transactions', err);
        this.errorMessage = 'Impossible de charger les transactions.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Helpers d'affichage
   */
  formatAmount(amount: number): string {
    return `${(amount / 100).toFixed(2)} €`;
  }

  formatDate(date: string): string {
    // L'API renvoie souvent un string ISO ou "Y-m-d".
    // Ici on fait simple, mais on pourra améliorer avec DatePipe.
    return date?.toString() ?? '—';
  }

  /**
   * Action placeholder (on branchera DELETE ensuite).
   */
  onDelete(t: Transaction): void {
    // TODO: brancher l'endpoint DELETE /api/transactions/{id}
    console.log('delete clicked', t.id);
  }
}
