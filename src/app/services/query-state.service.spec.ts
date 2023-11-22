import { TestBed } from '@angular/core/testing';

import { QueryStateService } from './query-state.service';

describe('QueryStateService', () => {
  let service: QueryStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
