
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { JournalEntriesComponent } from './components/journal-entries/journal-entries.component';
import { ExportComponent } from './components/export/export.component';

const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'journal-entries', component: JournalEntriesComponent },
  { path: 'export', component: ExportComponent },
  { path: '', redirectTo: '/accounts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
