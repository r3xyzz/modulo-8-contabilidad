import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule, FormsModule], // Importa CommonModule para usar *ngFor
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';
  cuentasContables: any[] = [];

  formularioVisible = false;
  cuentaForm = {
    nombreCuenta: '',
    tipoCuenta: '',
    codigoCuenta: '',
    descripcionCuenta: ''
  };

  cuentaSeleccionada: any = null;


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarCuentas();
  }

  cargarCuentas() {
    this.apiService.getCuentasContables().subscribe((data: any) => {
      this.cuentasContables = data;
      console.log('Cuentas cargadas:', data);
    });
  }

  nuevaCuenta() {
    this.cuentaSeleccionada = null;
    this.cuentaForm = {
      nombreCuenta: '',
      tipoCuenta: '',
      codigoCuenta: '',
      descripcionCuenta: ''
    };
    this.formularioVisible = true;
  }


  editarCuenta(cuenta: any) {
    this.cuentaSeleccionada = cuenta;
    this.cuentaForm = { ...cuenta };
    this.formularioVisible = true;
  }


  guardarCuenta() {
    if (this.cuentaSeleccionada) {
      // Editar
      this.apiService.updateCuentaContable(this.cuentaSeleccionada.idCuenta, this.cuentaForm).subscribe(() => {
        this.cargarCuentas();
        this.cancelar();
      });
    } else {
      // Crear nueva
      this.apiService.createCuentaContable(this.cuentaForm).subscribe(() => {
        this.cargarCuentas();
        this.cancelar();
      });
    }
  }

  eliminarCuenta(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cuenta contable?')) {
      this.apiService.deleteCuentaContable(id).subscribe(() => {
        this.cargarCuentas();
      });
    }
  }

  cancelar() {
    this.formularioVisible = false;
    this.cuentaForm = {
      nombreCuenta: '',
      tipoCuenta: '',
      codigoCuenta: '',
      descripcionCuenta: ''
    };
    this.cuentaSeleccionada = null;
  }

}
