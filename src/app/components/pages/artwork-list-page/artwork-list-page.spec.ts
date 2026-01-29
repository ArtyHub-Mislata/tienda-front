import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkListPage } from './artwork-list-page';

describe('ArtworkListPage', () => {
  let component: ArtworkListPage;
  let fixture: ComponentFixture<ArtworkListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
