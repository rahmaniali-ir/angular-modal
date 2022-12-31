import { TestBed } from '@angular/core/testing';

import { ActiveModal } from './active-modal.service';

describe('ActiveModalService', () => {
  let service: ActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
