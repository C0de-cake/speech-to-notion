import {SpeechToNotionFormComponent} from './speech-to-notion-form.component'
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateTestingModule} from "../shared/test/translate-test.module.spec";


describe('Speech to notion Form', () => {
  let component: SpeechToNotionFormComponent;
  let fixture: ComponentFixture<SpeechToNotionFormComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpeechToNotionFormComponent, TranslateTestingModule,
        FontAwesomeTestingModule, HttpClientTestingModule],
      providers: []
    })
      fixture = TestBed.createComponent(SpeechToNotionFormComponent);
      component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(component?.flowStatus).toContain('init');
    expect(compiled.querySelector('[data-cy=alert-error]')).toBeNull();
    component.flowStatus = "error";
    fixture.detectChanges();
    expect(compiled.querySelector('[data-cy=alert-error]')).toBeTruthy();
  });
});
