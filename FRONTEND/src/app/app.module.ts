import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Permite hacer peticiones HTTP
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Para iconos FontAwesome
import { CommonModule } from '@angular/common'; // Proporciona directivas comunes de Angular

import { AppRoutingModule } from './app-routing.module'; // Módulo de rutas de la app
import { AppComponent } from './app.component'; // Componente raíz
import { DashboardComponent } from './dashboard/dashboard.component'; // Componente standalone para el dashboard
import { ReportComponent } from './reports/report.component'; // Componente standalone para reportes
import { FormsModule } from '@angular/forms'; // Para formularios y ngModel


@NgModule({
  declarations: [
    AppComponent  // Solo el componente raíz se declara aquí (los standalone no van en declarations)
  ],
  imports: [
    BrowserModule,      // Necesario para apps web Angular
    AppRoutingModule,   // Importa las rutas principales
    HttpClientModule,   // Permite el uso de HttpClient en toda la app
    FontAwesomeModule,  // Permite usar iconos FontAwesome
    CommonModule,       // Directivas comunes (ngIf, ngFor, etc.)
    FormsModule,        // Para formularios y ngModel
    DashboardComponent, // Importa el componente standalone del dashboard
    ReportComponent,

  ],
  providers: [],        // Aquí irían los servicios globales si los hubiera
  bootstrap: [AppComponent] // Componente raíz que arranca la app
})
export class AppModule { }

