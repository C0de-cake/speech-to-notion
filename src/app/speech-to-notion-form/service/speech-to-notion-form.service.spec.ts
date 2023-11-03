import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SpeechToNotionFormService} from "./speech-to-notion-form.service";


describe('SpeechToNotionFormService', () => {
  let service: SpeechToNotionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpeechToNotionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
