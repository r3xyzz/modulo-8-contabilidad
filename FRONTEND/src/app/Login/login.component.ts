import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

 constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      () => {
        this.error = 'Error al intentar iniciar sesión';
      }
    );
  }
}
