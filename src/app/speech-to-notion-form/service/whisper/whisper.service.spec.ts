import {TestBed} from '@angular/core/testing';

import {WhisperService} from './whisper.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WhisperService', () => {
  let service: WhisperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WhisperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
