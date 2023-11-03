import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {NotionService} from "./notion/notion.service";
import {WhisperService} from "./whisper/whisper.service";
import {map, switchMap} from "rxjs";
import {WhisperResponse} from "./whisper/whisper.model";
import {State} from "../model/state.model";
import {
  Child,
  NotionCreatePageRequest,
  Paragraph,
  ParagraphRichTextElement,
  ParagraphText,
  Parent,
  Properties,
  Text,
  TitleElement
} from "./notion/notion-create-page-request.model";
import {NotionCreatePageResponse} from "./notion/notion-create-page-response.model";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpeechToNotionFormService {

  private whisperService = inject(WhisperService);
  private notionService = inject(NotionService);

  private translateSpeechToText$: WritableSignal<State<NotionCreatePageResponse, HttpErrorResponse>> =
    signal(State.Builder<NotionCreatePageResponse, HttpErrorResponse>().forInit().build());
  translateSpeechToText = computed(() => this.translateSpeechToText$());

  transcript(file: File, pageTitle: string, pageId: string): void {
    this.whisperService.transcriptSpeechToText(file)
      .pipe(
        map(whisperResponse => this.mapTextToNotionPageRequest(whisperResponse, pageTitle, pageId)),
        switchMap(notionPageRequest => this.notionService.createDoc(notionPageRequest))
      )
      .subscribe({
        next: notionPageResponse => this.translateSpeechToText$
          .set(State.Builder<NotionCreatePageResponse, HttpErrorResponse>().forSuccess(notionPageResponse).build()),
        error: err => {
          this.translateSpeechToText$.set(State.Builder<NotionCreatePageResponse, HttpErrorResponse>().forError(err).build())
        }
      });
  }

  mapTextToNotionPageRequest(whisperResponse: WhisperResponse,
                                     title: string,
                                     pageId: string): NotionCreatePageRequest {
    const text: Text = {
      content: title
    }

    const titleElement: TitleElement = {
      text
    }
    const titleElements = new Array<TitleElement>();
    titleElements.push(titleElement);

    const properties: Properties = {
      title: titleElements
    }

    const parent: Parent = {
      type: 'page_id',
      page_id: pageId
    }

    const paragraphRichText: ParagraphText = {
      content: whisperResponse.text
    }

    const paragraphRichTextElement: ParagraphRichTextElement = {
      type: 'text',
      text: paragraphRichText
    }

    const paragraphRichTextElements = new Array<ParagraphRichTextElement>();
    paragraphRichTextElements.push(paragraphRichTextElement);

    const paragraph: Paragraph = {
      rich_text: paragraphRichTextElements
    }

    const children: Child = {
      object: 'block',
      type: 'paragraph',
      paragraph
    }

    const childs = new Array<Child>();
    childs.push(children);

    return {
      parent,
      children: childs,
      properties
    };
  }
}
