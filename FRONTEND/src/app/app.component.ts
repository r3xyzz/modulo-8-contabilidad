import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root', // Selector principal de la aplicación
  templateUrl: './app.component.html', // Archivo de plantilla HTML asociado
  styleUrls: ['./app.component.css'],   // Archivo(s) de estilos CSS asociado(s)
  standalone: false // Indica que este componente NO es standalone (usa un módulo)
})
export class AppComponent implements OnInit {
  // Variable para mostrar un mensaje en la vista
  message = '';

  // Inyecta el servicio ApiService para consumir la API
  constructor(private apiService: ApiService) {}

  // Se ejecuta al iniciar el componente
  ngOnInit() {
    // Llama al método getCuentasContables del servicio y asigna el mensaje recibido
    this.apiService.getCuentasContables().subscribe((data: any) => {
      this.message = data.message;
    });
  }
}
