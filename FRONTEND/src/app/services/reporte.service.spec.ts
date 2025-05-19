import { TestBed } from '@angular/core/testing';

import { ReporteService } from './reporte.service';

// Describe el grupo de pruebas para el servicio ReporteService
describe('ReporteService', () => {
  let service: ReporteService;

  // Antes de cada prueba, configura el entorno de pruebas e inyecta el servicio
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteService);
  });

  // Prueba básica: verifica que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
