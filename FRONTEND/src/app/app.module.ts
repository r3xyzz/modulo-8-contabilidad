import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './reports/report.component';

@NgModule({
  declarations: [
    AppComponent // Solo el componente principal se declara aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    DashboardComponent, // Importa el componente standalone
    ReportComponent     // Importa el componente standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
