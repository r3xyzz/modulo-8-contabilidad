import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  message = '';

  constructor(private ApiService: ApiService) {}

  ngOnInit() {
    this.ApiService.getMessage().subscribe((data: any) => {
      this.message = data.message;
    });
  }
}
