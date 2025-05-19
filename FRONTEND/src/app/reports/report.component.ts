import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // <-- Importa HttpClient

// Importaciones para exportar archivos
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = 'Reportes';
  asientosContables: any[] = []; // Aquí se guardan los datos de los asientos contables
  selectedFormat: string = 'screen'; // Guarda el formato seleccionado en el select

  constructor(
    private apiService: ApiService,
    private http: HttpClient // <-- Agrega HttpClient al constructor
  ) {}

  ngOnInit() {
    // Al iniciar, obtiene los asientos contables desde el servicio
    this.apiService.getAsientosContables().subscribe((data: any) => {
      this.asientosContables = data;
    });
  }

  // Función para mostrar el reporte en pantalla (puedes dejarla vacía si no la usas)
  exportReport() {
    // Aquí podrías filtrar o preparar los datos para mostrar en pantalla

    this.sendReport(); // Llama a la función para enviar el reporte
  }

  // Función principal para descargar el reporte en el formato seleccionado
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

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'reporte.docx');
    });
  }

  // Envía los datos en pantalla a la API externa
  sendReport() {
    const url = 'http://34.225.192.85:8000/api/reportescontables/';
    const formData = new FormData();

    if (this.selectedFormat === 'excel') {
      // Genera Excel como Blob
      const ws = XLSX.utils.json_to_sheet(this.asientosContables);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      formData.append('archivoReporte', excelBlob, 'reporte.xlsx');
    } else if (this.selectedFormat === 'pdf') {
      // Genera PDF como Blob
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['Fecha', 'Descripción', 'Referencia']],
        body: this.asientosContables.map(a => [a.fechaAsiento, a.descripcionAsiento, a.referenciaAsiento])
      });
      const pdfBlob = doc.output('blob');
      formData.append('archivoReporte', pdfBlob, 'reporte.pdf');
    } else if (this.selectedFormat === 'word') {
      // Genera Word como Blob (async)
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

      // Word es asíncrono, así que espera el blob y luego envía
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

    // Para Excel y PDF (sincrónico)
    this.http.post(url, formData).subscribe({
      next: () => alert('Reporte enviado correctamente.'),
      error: () => alert('Error al enviar el reporte.')
    });
  }
}

