import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service'; // Servicio para consumir la API
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que este componente es standalone (no necesita un módulo)
  imports: [CommonModule, FormsModule], // Importa módulos necesarios para directivas y formularios
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Título de la página
  title = 'Dashboard';

  // Lista de cuentas contables que se mostrarán en la tabla
  cuentasContables: any[] = [];

  // Controla si el formulario de agregar/editar está visible
  formularioVisible = false;

  // Objeto que representa el formulario de cuenta contable
  cuentaForm = {
    nombreCuenta: '',
    tipoCuenta: '',
    codigoCuenta: '',
    descripcionCuenta: ''
  };

  // Guarda la cuenta seleccionada para editar (null si es nueva)
  cuentaSeleccionada: any = null;

  // Inyecta el servicio de la API
  constructor(private apiService: ApiService) {}

  // Se ejecuta al iniciar el componente, carga las cuentas contables
  ngOnInit() {
    this.cargarCuentas();
  }

  // Llama al servicio para obtener las cuentas contables y las guarda en la variable
  cargarCuentas() {
    this.apiService.getCuentasContables().subscribe((data: any) => {
      this.cuentasContables = data;
      console.log('Cuentas cargadas:', data);
    });
  }

  // Muestra el formulario para agregar una nueva cuenta
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

  // Muestra el formulario para editar una cuenta existente
  editarCuenta(cuenta: any) {
    this.cuentaSeleccionada = cuenta;
    this.cuentaForm = { ...cuenta }; // Copia los datos de la cuenta seleccionada
    this.formularioVisible = true;
  }

  // Guarda la cuenta (crea nueva o actualiza existente)
  guardarCuenta() {
    if (this.cuentaSeleccionada) {
      // Si hay cuenta seleccionada, actualiza
      this.apiService.updateCuentaContable(this.cuentaSeleccionada.idCuenta, this.cuentaForm).subscribe(() => {
        this.cargarCuentas();
        this.cancelar();
      });
    } else {
      // Si no hay cuenta seleccionada, crea nueva
      this.apiService.createCuentaContable(this.cuentaForm).subscribe(() => {
        this.cargarCuentas();
        this.cancelar();
      });
    }
  }

  // Elimina una cuenta contable por su ID
  eliminarCuenta(id: number) {
    if (confirm('¿Estás seguro de eliminar esta cuenta contable?')) {
      this.apiService.deleteCuentaContable(id).subscribe(() => {
        this.cargarCuentas();
      });
    }
  }

  // Cancela la edición/creación y oculta el formulario
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
