import { TestBed } from '@angular/core/testing';

import { RiscvStateService } from './riscv-state.service';

describe('RiscvStateService', () => {
  let service: RiscvStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiscvStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
