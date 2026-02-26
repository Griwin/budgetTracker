import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { TransactionListComponent } from './features/transactions/pages/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './features/transactions/pages/transaction-form/transaction-form.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Public
  { path: 'login', component: LoginComponent },

  // Protected
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionListComponent, canActivate: [authGuard] },
  { path: 'transactions/create', component: TransactionFormComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'dashboard' },
];
