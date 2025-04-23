import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter, Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Tab {
  id: number;
  title: string;
  hasIcon: boolean;
  matIcon?: string;
  componentRef?: any;
}

@Component({
  selector: 'chrome-tabs',
  templateUrl: './chromium-inspired-tabs-lib.component.html',
  styleUrls: ['./chromium-inspired-tabs-lib.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeOut', [
      state('void', style({ opacity: 1 })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideOut', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ChromiumInspiredTabsLibComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  public tabs: Tab[] = [];
  public focusedTabId: number | null = null;
  public nextTabId: number = 0;

  @Input()
  public tabs$: Observable<Tab[]> = new Observable<Tab[]>();

  @Input()
  public devToolsEnabled: boolean = true;

  @Output()
  public addTabButtonClick: EventEmitter<Tab> = new EventEmitter<Tab>();

  @Output()
  public tabClose: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public tabFocus: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public devToolsButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }
  
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.tabs$.subscribe(tabs => {
        this.tabs = tabs;
        this.nextTabId = tabs.length > 0 ? Math.max(...tabs.map(tab => tab.id)) + 1 : 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addTab(): void {
    this.nextTabId++;
    const newTab: Tab = {
      id: this.nextTabId,
      title: `New tab id ${this.nextTabId}`,
      hasIcon: false
    };
    this.addTabButtonClick.emit(newTab);
    this.tabs.push(newTab);
    this.focusedTabId = newTab.id;
    this.focusTab(newTab.id);
  }

  closeTab(tabId: number): void {
    this.tabClose.emit(tabId);
    this.tabs = this.tabs.filter(tab => tab.id !== tabId);
    if(this.focusedTabId == tabId){
      this.focusedTabId = 0;
      this.focusTab(0);
    }
  }

  focusTab(tabId: number): void {
    this.tabFocus.emit(tabId);
    this.focusedTabId = tabId;
  }

  goHome() {
    this.focusTab(0);
  }

  toggleDevTools() {
    this.devToolsButtonClick.emit(true);
  }

}

