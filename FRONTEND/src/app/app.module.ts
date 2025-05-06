import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { JournalEntriesComponent } from './components/journal-entries/journal-entries.component';
import { ExportComponent } from './components/export/export.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    JournalEntriesComponent,
    ExportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
