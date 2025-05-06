import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  message: string = ''; // Cambiado para usar el mensaje del API

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMessage().subscribe((data: any) => {
      this.message = data.message; // Ajustado para manejar la respuesta del API
    });
  }

  exportData(): void {
    // Simulación de exportación
    const data = [
      { id: 1, nombre: 'Cuenta 1', descripcion: 'Descripción 1' },
      { id: 2, nombre: 'Cuenta 2', descripcion: 'Descripción 2' }
    ];

    const csvContent = 'data:text/csv;charset=utf-8,'
      + data.map(e => Object.values(e).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
