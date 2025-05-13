import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule], // Importa CommonModule para usar *ngFor
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  cuentasContables: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCuentasContables().subscribe((data: any) => {
      this.cuentasContables = data;
    });
  }
}
