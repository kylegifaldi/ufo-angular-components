import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Tab {
  id: number;
  title: string;
  hasIcon: boolean;
  matIcon?: string;
  componentRef?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChromiumInspiredTabsLibService {
  public tabsSubject = new BehaviorSubject<Tab[]>([]);
  private focusedTabId: number = 1; 
  
  constructor() { }

  /**
   * Adds a new tab to the tab collection
   * @param title Optional title for the new tab
   * @param hasIcon Whether the tab has an icon
   * @param matIcon Optional material icon name
   * @param componentRef Optional component reference to associate with this tab
   * @returns The ID of the newly created tab
   */
  public addTab(title?: string, hasIcon: boolean = false, matIcon?: string, componentRef?: any): number {
    const currentTabs = this.tabsSubject.getValue();
    const nextId = currentTabs.length > 0 ? Math.max(...currentTabs.map(tab => tab.id)) + 1 : 0;
    
    const newTab: Tab = {
      id: nextId,
      title: title || `New tab id ${nextId}`,
      hasIcon,
      matIcon,
      componentRef
    };
    
    this.tabsSubject.next([...currentTabs, newTab]);
    this.focusedTabId = nextId; // Set the newly created tab as focused
    return nextId;
  }
  
  /**
   * Removes a tab by its ID
   * @param tabId The ID of the tab to remove
   */
  public closeTab(tabId: number): void {
    const currentTabs = this.tabsSubject.getValue();
    this.tabsSubject.next(currentTabs.filter(tab => tab.id !== tabId));
    if(this.focusedTabId == tabId) {
      this.focusedTabId-=1; // Decrement the focused tab ID if the closed tab was focused
    }
  }
  
  /**
   * Gets the current tabs
   * @returns The current tabs array
   */
  public getTabs(): Tab[] {
    return this.tabsSubject.getValue();
  }

  public getNextTabId(): number {
    let nextId = 0;
    this.tabsSubject.getValue().forEach(tab => {
      if (tab.id >= nextId) {
        nextId = tab.id + 1;
      }
    });
    return nextId;
  }

  public focusTab(tabId: number): void {
    this.focusedTabId = tabId;
  }

  getFocusedTabId(): number {
    return this.focusedTabId;
  }
}