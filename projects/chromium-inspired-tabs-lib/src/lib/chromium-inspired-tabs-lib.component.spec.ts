import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromiumInspiredTabsLibComponent } from './chromium-inspired-tabs-lib.component';

describe('ChromiumInspiredTabsLibComponent', () => {
  let component: ChromiumInspiredTabsLibComponent;
  let fixture: ComponentFixture<ChromiumInspiredTabsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChromiumInspiredTabsLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromiumInspiredTabsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
