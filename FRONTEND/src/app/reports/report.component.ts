import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service'; // Servicio para consumir la API de asientos contables
import { HttpClient } from '@angular/common/http'; // Para enviar archivos al backend

// Importaciones para exportar archivos en diferentes formatos
import * as XLSX from 'xlsx'; // Para Excel
import jsPDF from 'jspdf'; // Para PDF
import autoTable from 'jspdf-autotable'; // Para tablas en PDF
import { saveAs } from 'file-saver'; // Para guardar archivos en el navegador
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx'; // Para Word

@Component({
  selector: 'app-report',
  standalone: true, // Componente standalone (no requiere módulo)
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  // Título de la sección
  title = 'Reportes';

  // Lista de asientos contables a mostrar y exportar
  asientosContables: any[] = [];

  // Formato seleccionado para exportar o enviar el reporte
  selectedFormat: string = 'screen';

  // Inyecta los servicios necesarios
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  // Al iniciar, obtiene los asientos contables desde la API
  ngOnInit() {
    this.apiService.getAsientosContables().subscribe((data: any) => {
      this.asientosContables = data;
    });
  }

  // Muestra el reporte en pantalla (puedes agregar lógica de filtrado aquí)
  exportReport() {
    // Aquí podrías filtrar o preparar los datos para mostrar en pantalla
    this.sendReport(); // También envía el reporte al backend al generar
  }

  // Descarga el reporte en el formato seleccionado
  downloadReport() {
    switch (this.selectedFormat) {
      case 'excel':
        this.exportToExcel();
        break;
      case 'pdf':
        this.exportToPDF();
        break;
      case 'word':
        this.exportToWord();
        break;
      default:
        alert('Selecciona un formato válido para descargar.');
        break;
    }
  }

  // Exporta los datos a un archivo Excel (.xlsx)
  exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(this.asientosContables);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, 'reporte.xlsx');
  }

  // Exporta los datos a un archivo PDF usando jsPDF y autoTable
  exportToPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Fecha', 'Descripción', 'Referencia']],
      body: this.asientosContables.map(a => [a.fechaAsiento, a.descripcionAsiento, a.referenciaAsiento])
    });
    doc.save('reporte.pdf');
  }

  // Exporta los datos a un archivo Word (.docx) usando docx y file-saver
  exportToWord() {
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Fecha')] }),
          new TableCell({ children: [new Paragraph('Descripción')] }),
          new TableCell({ children: [new Paragraph('Referencia')] }),
        ]
      }),
      ...this.asientosContables.map(a =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(a.fechaAsiento)] }),
            new TableCell({ children: [new Paragraph(a.descripcionAsiento)] }),
            new TableCell({ children: [new Paragraph(a.referenciaAsiento)] }),
          ]
        })
      )
    ];

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph('Reporte Contable'),
          new Table({ rows: tableRows })
        ]
      }]
    });

    // Genera el archivo Word y lo descarga
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'reporte.docx');
    });
  }

  // Envía el reporte generado al endpoint externo para guardarlo en el backend
  sendReport() {
    const url = 'http://34.225.192.85:8000/api/reportescontables/';
    const formData = new FormData();

    if (this.selectedFormat === 'excel') {
      // Genera Excel como Blob y lo adjunta al FormData
      const ws = XLSX.utils.json_to_sheet(this.asientosContables);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      formData.append('archivoReporte', excelBlob, 'reporte.xlsx');
    } else if (this.selectedFormat === 'pdf') {
      // Genera PDF como Blob y lo adjunta al FormData
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['Fecha', 'Descripción', 'Referencia']],
        body: this.asientosContables.map(a => [a.fechaAsiento, a.descripcionAsiento, a.referenciaAsiento])
      });
      const pdfBlob = doc.output('blob');
      formData.append('archivoReporte', pdfBlob, 'reporte.pdf');
    } else if (this.selectedFormat === 'word') {
      // Genera Word como Blob (asíncrono) y lo adjunta al FormData
      const tableRows = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Fecha')] }),
            new TableCell({ children: [new Paragraph('Descripción')] }),
            new TableCell({ children: [new Paragraph('Referencia')] }),
          ]
        }),
        ...this.asientosContables.map(a =>
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(a.fechaAsiento)] }),
              new TableCell({ children: [new Paragraph(a.descripcionAsiento)] }),
              new TableCell({ children: [new Paragraph(a.referenciaAsiento)] }),
            ]
          })
        )
      ];

      const doc = new Document({
        sections: [{
          children: [
            new Paragraph('Reporte Contable'),
            new Table({ rows: tableRows })
          ]
        }]
      });

      // Espera a que se genere el blob y luego lo envía
      Packer.toBlob(doc).then(wordBlob => {
        formData.append('archivoReporte', wordBlob, 'reporte.docx');
        this.http.post(url, formData).subscribe({
          next: () => alert('Reporte Word enviado correctamente.'),
          error: () => alert('Error al enviar el reporte Word.')
        });
      });
      return; // Sale para evitar doble envío
    } else {
      alert('Selecciona un formato válido para enviar.');
      return;
    }

    // Para Excel y PDF (sincrónico): envía el FormData al backend
    this.http.post(url, formData).subscribe({
      next: () => alert('Reporte enviado correctamente.'),
      error: () => alert('Error al enviar el reporte.')
    });
  }
}

// Este componente permite mostrar, descargar y enviar reportes contables en varios formatos.
// Usa servicios para obtener los datos y para enviar archivos al backend.
// Cada método está claramente separado para cada acción (mostrar, descargar, enviar).
