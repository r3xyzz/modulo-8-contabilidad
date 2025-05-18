import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCuentasContables().subscribe((data: any) => {
      this.message = data.message;
    });
  }
}
