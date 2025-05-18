import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // standalone: true
import { ReportComponent } from './reports/report.component'; // standalone: true
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent // Solo el componente raíz
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    DashboardComponent, // Standalone
    ReportComponent     // Standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
