import {Component, effect, inject} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";
import {SpeechToTextForm} from "./model/speech-to-text-form.model";
import {SpeechToNotionFormService} from "./service/speech-to-notion-form.service";
import {NotionCreatePageResponse} from "./service/notion/notion-create-page-response.model";

type FlowStatus = 'init' | 'success' | 'error';

@Component({
  selector: 'app-speech-to-notion-form',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './speech-to-notion-form.component.html',
  styleUrls: ['./speech-to-notion-form.component.css']
})
export class SpeechToNotionFormComponent {
  linkNotionDoc = "";

  audioToProcess: File | null = null;

  flowStatus: FlowStatus = 'init';

  speechToTextForm = new FormGroup<SpeechToTextForm>({
    audioFile: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    documentName: new FormControl('', {validators: [Validators.required], nonNullable: true}),
  });

  isGenerating = false;

  private speechToNotionService = inject(SpeechToNotionFormService);

  // Your transcript page will be created under this page id
  private parentPageId = '923c0d3ce6224c5b8179c9af0bb6fd4b';

  onUploadFile(target: EventTarget | null) {
    if (target !== null) {
      const htmlInputTarget = target as HTMLInputElement;
      if (htmlInputTarget.files !== null) {
        this.audioToProcess = htmlInputTarget.files[0];
      }
    }
  }

  constructor() {
    effect(() => this.onPageCreation());
  }

  private onPageCreation() {
    let notionCreatePageResponseState = this.speechToNotionService.translateSpeechToText();
    if (notionCreatePageResponseState.status == 'OK' && this.isGenerating) {
      this.onGenerationSuccess(notionCreatePageResponseState.value!);
    } else if (notionCreatePageResponseState.status == 'ERROR' && this.isGenerating) {
      this.onGenerationError(notionCreatePageResponseState.error!);
    }
  }

  onGenerate() {
    if (this.audioToProcess !== null) {
      this.isGenerating = true;
      const documentName = this.speechToTextForm.getRawValue().documentName;
      this.speechToNotionService.transcript(this.audioToProcess, documentName, this.parentPageId);
    }
  }

  private onGenerationError(err: HttpErrorResponse) {
    console.error(err);
    this.isGenerating = false;
    this.flowStatus = "error";
  }

  private onGenerationSuccess(notionPageResponse: NotionCreatePageResponse) {
    this.linkNotionDoc = notionPageResponse.url;
    this.flowStatus = "success";
    this.isGenerating = false;
  }
}
