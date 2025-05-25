import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router'; // Importa Router


@Component({
  selector: 'app-root', // Selector principal de la aplicación
  templateUrl: './app.component.html', // Archivo de plantilla HTML asociado
  styleUrls: ['./app.component.css'],   // Archivo(s) de estilos CSS asociado(s)
  standalone: false,  //Indica que este componente NO es standalone (usa un módulo)
  // imports: [CommonModule, RouterModule],
})

export class AppComponent implements OnInit {
  // Variable para mostrar un mensaje en la vista
  message = '';

  // Inyecta el servicio ApiService para consumir la API
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router ) {}

  // Se ejecuta al iniciar el componente
  ngOnInit() {
    // Llama al método getCuentasContables del servicio y asigna el mensaje recibido
    this.apiService.getCuentasContables().subscribe((data: any) => {
      this.message = data.message;
    });
  }

  // Componente principal de la aplicación
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsername(): string | null {
  return localStorage.getItem('username');
}
}
