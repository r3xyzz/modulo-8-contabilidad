import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Ruta corregida

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.css']
})
export class JournalEntriesComponent implements OnInit {
  journalEntries: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getJournalEntries().subscribe((data: any) => {
      this.journalEntries = data;
    });
  }
}
