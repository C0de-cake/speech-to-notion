import {TestBed} from '@angular/core/testing';

import {NotionService} from './notion.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NotionService', () => {
  let service: NotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
