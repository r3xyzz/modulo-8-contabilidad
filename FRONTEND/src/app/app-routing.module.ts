import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './reports/report.component';

// Define las rutas de la aplicación
const routes: Routes = [
  // Redirige la ruta vacía al dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // Ruta para el dashboard principal
  { path: 'dashboard', component: DashboardComponent },
  // Ruta para la sección de reportes
  { path: 'reports', component: ReportComponent }
];

@NgModule({
  // Importa y configura el módulo de rutas con las rutas definidas
  imports: [RouterModule.forRoot(routes)],
  // Exporta el RouterModule para que esté disponible en toda la app
  exports: [RouterModule]
})
export class AppRoutingModule { }
