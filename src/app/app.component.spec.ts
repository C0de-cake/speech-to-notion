import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslateTestingModule} from "./shared/test/translate-test.module.spec";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent, TranslateTestingModule]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'speech-to-notion-standalone' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('speech-to-notion-standalone');
  });
});
