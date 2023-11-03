import {TranslateLoader, TranslateModule, TranslatePipe} from "@ngx-translate/core";
import {Observable, of} from "rxjs";
import {Injectable, NgModule, Pipe, PipeTransform} from "@angular/core";

const translations: any = {};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

@Pipe({
  name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

@Injectable()
export class TranslateServiceStub {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }

  public getBrowserLang() {
    return 'es';
  }

  public setDefaultLang(language: any) {}

  public get currentLang() {
    return 'en';
  }

  public instant(key: any) {
    return 'value';
  }

  public use(lang: any) {}
}

@NgModule({
  declarations: [TranslatePipeMock],
  providers: [
    { provide: TranslatePipe, useClass: TranslatePipeMock }
  ],
  imports: [
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: FakeLoader }
    })
  ],
  exports: [TranslatePipeMock, TranslateModule]
})
export class TranslateTestingModule {}
