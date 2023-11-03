import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    NgOptimizedImage
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    NgOptimizedImage
  ]
})
export class SharedModule { }
