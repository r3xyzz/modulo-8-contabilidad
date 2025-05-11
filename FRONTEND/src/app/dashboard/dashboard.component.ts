import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule], // Importa CommonModule para usar *ngFor
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'Dashboard';

  // Datos de ejemplo para la tabla
  cuentasContables = [
    { nombreCuenta: 'Caja', tipoCuenta: 'Activo', codigoCuenta: '101', descripcionCuenta: 'Dinero en efectivo' },
    { nombreCuenta: 'Banco', tipoCuenta: 'Activo', codigoCuenta: '102', descripcionCuenta: 'Dinero en cuentas bancarias' },
    { nombreCuenta: 'Clientes', tipoCuenta: 'Activo', codigoCuenta: '103', descripcionCuenta: 'Cuentas por cobrar' }
  ];
}
