import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WhisperResponse} from "./whisper.model";

@Injectable({
  providedIn: 'root'
})
export class WhisperService {

  private baseURL = "http://localhost:8080/api/v1/audio/transcriptions";

  private http = inject(HttpClient);

  transcriptSpeechToText(file: File): Observable<WhisperResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');
    return this.http.post<WhisperResponse>(this.baseURL, formData);
  }
}
