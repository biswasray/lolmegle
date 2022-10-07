import { TestBed } from '@angular/core/testing';

import { ChatService } from './chatservice.service';

describe('ChatserviceService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
