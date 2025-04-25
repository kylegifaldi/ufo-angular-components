import { Routes } from '@angular/router';
import { TabsDemoComponent } from './demo/tabs-demo.component';

export const routes: Routes = [
  { path: '', component: TabsDemoComponent },
  { path: '**', redirectTo: '' }
];