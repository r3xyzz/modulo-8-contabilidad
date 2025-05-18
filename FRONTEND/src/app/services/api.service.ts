import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://34.225.192.85:8000/api'; // Cambia esto por la URL de la API

  constructor(private http: HttpClient) {}

  //CUENTAS CONTABLES
  getCuentasContables() {
    return this.http.get(`${this.baseUrl}/cuentascontables/`);
  }
  createCuentaContable(cuenta: any) {
    return this.http.post(`${this.baseUrl}/cuentascontables/`, cuenta);
  }
  updateCuentaContable(id: number, cuenta: any) {
    return this.http.put(`${this.baseUrl}/cuentascontables/${id}/`, cuenta);
  }
  deleteCuentaContable(id: number) {
    return this.http.delete(`${this.baseUrl}/cuentascontables/${id}/`);
  }


  getAsientosContables() {
    return this.http.get(`${this.baseUrl}/asientoscontables/`);
  }

  getDetallesAsientos() {
    return this.http.get(`${this.baseUrl}/detallesasientos/`);
  }

  getTransacciones() {
    return this.http.get(`${this.baseUrl}/transacciones/`);
  }
}
