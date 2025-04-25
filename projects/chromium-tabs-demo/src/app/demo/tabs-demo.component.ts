import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChromiumInspiredTabsLibComponent } from 'chromium-inspired-tabs-lib';
import { ChromiumInspiredTabsLibService } from 'chromium-inspired-tabs-lib';

export interface Tab {
  id: number;
  title: string;
  hasIcon: boolean;
  matIcon?: string;
  componentRef?: any;
}
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [
    CommonModule,
    ChromiumInspiredTabsLibComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './tab-demo.component.html',
  styleUrl: './tab-demo.component.css',
})
export class TabsDemoComponent {
    tabsSubject: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([
    {
        id: 1,
        title: '',
        hasIcon: true,
        matIcon: 'home',
        componentRef: undefined
    },
    {
        id: 2,
        title: '',
        hasIcon: true,
        matIcon: 'settings',
        componentRef: undefined
    },
    {
        id: 3,
        title: '',
        hasIcon: true,
        matIcon: 'person',
        componentRef: undefined
    }
    ]);
    
  constructor(private tabsService: ChromiumInspiredTabsLibService) {}
  
  ngOnInit() {
  }
  
}