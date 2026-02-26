import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  /**
   * Déconnecte l'utilisateur en supprimant le token puis redirige vers /login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
