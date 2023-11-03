import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "./shared/icons/font-awesome-icons";
import {SharedModule} from "./shared/shared.module";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'speech-to-notion-standalone';

  translateService = inject(TranslateService);

  faIconLibrary = inject(FaIconLibrary)

  ngOnInit(): void {
    this.initFontAwesome();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  switchLanguage(language: string) {
    this.translateService.use(language);
  }
}
