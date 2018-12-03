import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRemoteApiComponent } from './search-remote-api.component';

describe('SearchRemoteApiComponent', () => {
  let component: SearchRemoteApiComponent;
  let fixture: ComponentFixture<SearchRemoteApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRemoteApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRemoteApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
