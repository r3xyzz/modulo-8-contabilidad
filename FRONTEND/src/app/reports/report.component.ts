import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Al iniciar, obtiene los asientos contables desde el servicio
    this.apiService.getAsientosContables().subscribe((data: any) => {
      this.asientosContables = data;
    });
  }

  // Función para mostrar el reporte en pantalla (puedes dejarla vacía si no la usas)
  exportReport() {
    // Aquí podrías filtrar o preparar los datos para mostrar en pantalla
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
}

