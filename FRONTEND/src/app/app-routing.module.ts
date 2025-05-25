import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './reports/report.component';
import { LoginComponent } from './Login/login.component';
import { AuthGuard } from './services/auth.guard';

// Define las rutas de la aplicación
const routes: Routes = [
  // Redirige la ruta vacía al dashboard
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Ruta para la sección de reportes
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
  // Ruta para el componente de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  // Importa y configura el módulo de rutas con las rutas definidas
  imports: [RouterModule.forRoot(routes)],
  // Exporta el RouterModule para que esté disponible en toda la app
  exports: [RouterModule]
})
export class AppRoutingModule { }
