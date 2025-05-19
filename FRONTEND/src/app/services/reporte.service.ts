import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class ReporteService {
    // URL de la API para obtener los datos del reporte (ajusta según tu backend)
    private apiUrl = 'http://localhost:8080/api/cuentascontables/';

    // Inyecta el cliente HTTP para hacer peticiones a la API
    constructor(private http: HttpClient) { }

    // Método para obtener los datos del reporte desde la API
    obtenerDatosReporte(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}
