import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {
    private apiUrl = 'http://localhost:8080/api/cuentascontables/';

    constructor(private http: HttpClient) { }

    obtenerDatosReporte(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}