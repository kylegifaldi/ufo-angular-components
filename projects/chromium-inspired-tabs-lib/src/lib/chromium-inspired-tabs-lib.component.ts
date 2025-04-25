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
import { BehaviorSubject, filter, Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ChromiumInspiredTabsLibService } from './chromium-inspired-tabs-lib.service';

export interface Tab {
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
  protected tabs: Tab[] = [];

  @Input()
  public tabsSubject: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);

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

  constructor(private chromiumTabsService: ChromiumInspiredTabsLibService) {}

  
  ngOnInit(): void {
    this.chromiumTabsService.tabsSubject = this.tabsSubject;
    this.subscriptions.add(this.chromiumTabsService.tabsSubject.subscribe(tabs => {
      this.tabs = tabs;
    }));
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected addTab(): void {
    const newTabId = this.chromiumTabsService.addTab(`New tab id ${this.chromiumTabsService.getNextTabId()}`, false);
  }

  closeTab(tabId: number): void {
    this.chromiumTabsService.closeTab(tabId);
    this.tabClose.emit(tabId);
  }

  focusTab(tabId: number): void {
    this.chromiumTabsService.focusTab(tabId);
    this.tabFocus.emit(tabId);
  }

  toggleDevTools() {
    // open dev tools here
    this.devToolsButtonClick.emit(true);
  }

  get focusedTabId(): number {
    return this.chromiumTabsService.getFocusedTabId();
  }

}

