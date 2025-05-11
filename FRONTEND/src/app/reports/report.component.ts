import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule], // Importa CommonModule para usar *ngFor
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  title = 'Reportes';

  asientosContables = [
    { fechaAsiento: '2025-05-01', descripcionAsiento: 'Compra de mercancías', referenciaAsiento: 'A001' },
    { fechaAsiento: '2025-05-02', descripcionAsiento: 'Pago a proveedores', referenciaAsiento: 'A002' },
    { fechaAsiento: '2025-05-03', descripcionAsiento: 'Venta de productos', referenciaAsiento: 'A003' }
  ];
}
