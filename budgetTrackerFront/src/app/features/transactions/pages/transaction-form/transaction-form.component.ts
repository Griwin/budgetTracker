import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionService } from '../../../../core/services/transaction.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../models/category.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule],
  templateUrl: './transaction-form.component.html',

})
export class TransactionFormComponent implements OnInit {
  form!: FormGroup;

  categories: Category[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
  private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
    private readonly router: Router

  ) {

    // Formulaire : on force des valeurs valides
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]], // min 1 (centime)
      type: ['expense', Validators.required],
      date: ['', Validators.required],
      category_id: [null, [Validators.required]], // plus de "1" par défaut
    });
  }

  ngOnInit(): void {
    // Chargement des catégories au démarrage du formulaire
    console.log('TransactionForm ngOnInit ✅');

    this.categoryService.getAll().subscribe({
      next: (cats) => {
        console.log('categories from api', cats);
        this.categories = cats;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Impossible de charger les catégories.';
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Formulaire invalide. Vérifie les champs.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const v = this.form.value;

    // Payload envoyé à l'API
    const payload = {
      amount: Number(v.amount),
      type: String(v.type) as 'income' | 'expense',
      date: String(v.date),
      category_id: Number(v.category_id),
    };

    this.transactionService.create(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création de la transaction.';
      },
    });
  }
}
