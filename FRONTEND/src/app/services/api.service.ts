import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class ApiService {

  // URL base de la API backend (ajusta según tu servidor)
  private baseUrl = 'http://34.225.192.85:8000/api';

  // Inyecta el cliente HTTP para hacer peticiones a la API
  constructor(private http: HttpClient) {}

  // ==========================
  // MÉTODOS PARA CUENTAS CONTABLES
  // ==========================

  // Obtiene la lista de cuentas contables
  getCuentasContables() {
    return this.http.get(`${this.baseUrl}/cuentascontables/`);
  }

  // Crea una nueva cuenta contable
  createCuentaContable(cuenta: any) {
    return this.http.post(`${this.baseUrl}/cuentascontables/`, cuenta);
  }

  // Actualiza una cuenta contable existente por su ID
  updateCuentaContable(id: number, cuenta: any) {
    return this.http.put(`${this.baseUrl}/cuentascontables/${id}/`, cuenta);
  }

  // Elimina una cuenta contable por su ID
  deleteCuentaContable(id: number) {
    return this.http.delete(`${this.baseUrl}/cuentascontables/${id}/`);
  }

  // ==========================
  // MÉTODOS PARA ASIENTOS CONTABLES
  // ==========================

  // Obtiene la lista de asientos contables
  getAsientosContables() {
    return this.http.get(`${this.baseUrl}/asientoscontables/`);
  }

  // ==========================
  // MÉTODOS PARA DETALLES DE ASIENTOS
  // ==========================

  // Obtiene la lista de detalles de asientos
  getDetallesAsientos() {
    return this.http.get(`${this.baseUrl}/detallesasientos/`);
  }

  // ==========================
  // MÉTODOS PARA TRANSACCIONES
  // ==========================

  // Obtiene la lista de transacciones
  getTransacciones() {
    return this.http.get(`${this.baseUrl}/transacciones/`);
  }
}
