

# Chromium Inspired Tabs Library

A modern, flexible tab component for Angular applications inspired by Chromium's tab design. This library provides a clean, responsive tabbed interface with support for icons, dynamic tab management, and customizable styling.

## Live Demo

![Tabs Example](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExczZ0aHN3d2w0ZXk2bmVuMHFoYWU5dDg0bjgzenUyZ2g4cDNmeGNyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Liv37EI0AEL0Xyu9QD/giphy.gif)

[Interactive Demo!](https://kylegifaldi.github.io/ufo-angular-components/)

## Installation

Install the library via npm:

```bash
npm install chromium-inspired-tabs-lib

```

## Basic Usage

### Import the module in your application:

TypeScript

```
// In your component where you want to use tabs
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChromiumInspiredTabsLibComponent, ChromiumInspiredTabsLibService } from 'chromium-inspired-tabs-lib';

@Component({
  // ...
  standalone: true,
  imports: [
    CommonModule,
    ChromiumInspiredTabsLibComponent,
    // other imports
  ],
})
export class YourComponent {
  // Component implementation
}

```

### Add to your component template:

HTML

```
<chrome-tabs
  [tabsSubject]="tabsSubject"
  (tabClose)="handleTabClose($event)"
  (tabFocus)="handleTabFocus($event)"
  (devToolsButtonClick)="handleDevTools($event)">
</chrome-tabs>

```

### Configure in your component TS file:

TypeScript

```
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChromiumInspiredTabsLibComponent, ChromiumInspiredTabsLibService } from 'chromium-inspired-tabs-lib';

export interface Tab {
  id: number;
  title: string;
  hasIcon: boolean;
  matIcon?: string;
  componentRef?: any;
}

@Component({
  // Component metadata
})
export class YourComponent {
  // Initialize with default tabs
  tabsSubject: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([
    { id: 1, title: 'Home', hasIcon: true, matIcon: 'home', componentRef: undefined },
    { id: 2, title: 'Settings', hasIcon: true, matIcon: 'settings', componentRef: undefined }
  ]);

  constructor(private tabsService: ChromiumInspiredTabsLibService) {}

  // Handle tab events
  handleTabClose(tabId: number) {
    console.log(`Tab closed: ${tabId}`);
  }

  handleTabFocus(tabId: number) {
    console.log(`Tab focused: ${tabId}`);
  }

  handleDevTools(enabled: boolean) {
    console.log(`DevTools toggled: ${enabled}`);
  }
}

```

## API Reference

### Tab Interface

TypeScript

```
interface Tab {
  id: number;         // Unique identifier for the tab
  title: string;      // Tab title text
  hasIcon: boolean;   // Whether the tab has an icon
  matIcon?: string;   // Optional Material icon name (if hasIcon is true)
  componentRef?: any; // Optional reference to a component to associate with this tab
}

```

### Component Inputs

Input

Type

Default

Description

`tabsSubject`

`BehaviorSubject<Tab[]>`

`new BehaviorSubject([])`

Subject that holds the tabs collection

`devToolsEnabled`

`boolean`

`true`

Whether to show the dev tools toggle button

Export to Sheets

### Component Outputs

Output

Event Type

Description

`addTabButtonClick`

`EventEmitter<Tab>`

Emitted when the add tab button is clicked

`tabClose`

`EventEmitter<number>`

Emitted when a tab is closed, returns the tab ID

`tabFocus`

`EventEmitter<number>`

Emitted when a tab is focused, returns the tab ID

`devToolsButtonClick`

`EventEmitter<boolean>`

Emitted when the dev tools button is clicked

Export to Sheets

### Service Methods

The `ChromiumInspiredTabsLibService` provides the following methods for managing tabs:

Method

Parameters

Return

Description

`addTab`

`title?: string`, `hasIcon: boolean = false`, `matIcon?: string`, `componentRef?: any`

`number`

Adds a new tab and returns its ID

`closeTab`

`tabId: number`

`void`

Closes a tab by ID

`focusTab`

`tabId: number`

`void`

Sets focus to a tab by ID

`getTabs`

`none`

`Tab[]`

Returns the current collection of tabs

`getNextTabId`

`none`

`number`

Gets the next available tab ID

`getFocusedTabId`

`none`

`number`

Returns the ID of the currently focused tab

Export to Sheets

## Advanced Usage

### Dynamic Tab Creation

TypeScript

```
import { Component } from '@angular/core';
import { ChromiumInspiredTabsLibService } from 'chromium-inspired-tabs-lib';

@Component({
  // Component metadata
})
export class YourAdvancedComponent {
  constructor(private tabsService: ChromiumInspiredTabsLibService) {}

  addCustomTab() {
    // Add a tab with custom title
    this.tabsService.addTab('Custom Tab', false);
  }

  addIconTab() {
    // Add a tab with an icon
    this.tabsService.addTab('Icon Tab', true, 'person');
  }

  addComponentTab(component: any) {
    // Add a tab with an associated component
    this.tabsService.addTab('Component Tab', true, 'code', component);
  }
}

```

### Working with Associated Components

You can associate a component with a tab and use it to dynamically load content:



```TypeScript
import { Component, Input, NgFor, NgIf, NgComponentOutlet } from '@angular/common';
import { Tab } from './path-to-your-tab-interface'; // Adjust path as needed

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [NgFor, NgIf, NgComponentOutlet],
  template: `
    <ng-container *ngFor="let tab of tabs">
      <div *ngIf="tab.id === currentTabId">
        <ng-container *ngComponentOutlet="tab.componentRef"></ng-container>
      </div>
    </ng-container>
  `
})
export class TabContentComponent {
  @Input() currentTabId: number | null = null;
  @Input() tabs: Tab[] = [];
}

```

## Styling Customization

The library provides default styling that matches Chromium's tab design, but you can customize it by overriding CSS variables:



```CSS
:root {
  --chrome-tabs-background: #f0f0f0;
  --chrome-tab-background: #fff;
  --chrome-tab-active-background: #005CBB;
  --chrome-tab-active-color: #fff;
  --chrome-tab-inactive-color: #333;
  --chrome-tab-hover-background: #d5eafe;
}

```

## Material Icons Integration

This component uses Material Icons. Make sure to include the Material Icons font in your project:

### Install Angular Material:



```Bash
ng add @angular/material

```

### Include Material Icons in your `index.html`:



```HTML
<link href="[https://fonts.googleapis.com/icon?family=Material+Icons](https://fonts.googleapis.com/icon?family=Material+Icons)" rel="stylesheet">

```

Or include in your global styles file (e.g., `styles.css`):


```CSS
@import url('[https://fonts.googleapis.com/icon?family=Material+Icons](https://fonts.goog
```

# Compatibility
- Angular 16+
- Compatible with standalone components and NgModules
- Works with Angular Material 16+

# Use Cases
- Web applications requiring multiple workspaces or tabs
- Dashboards with multiple views
- Browser-like interfaces
- IDE or code editor interfaces
- Any application requiring tabbed navigation

# Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgments
- Inspired by Chromium browser's tab design
- Built with Angular and Material Design

# Example Project
Check out our live demo for interactive examples and code snippets!
