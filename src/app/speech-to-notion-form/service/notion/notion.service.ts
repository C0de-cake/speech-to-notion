import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotionCreatePageRequest} from "./notion-create-page-request.model";
import {NotionCreatePageResponse} from "./notion-create-page-response.model";

@Injectable({
  providedIn: 'root'
})
export class NotionService {

  private baseURL = "http://localhost:8080/api/v1/notion";

  private http = inject(HttpClient);

  createDoc(newPage: NotionCreatePageRequest): Observable<NotionCreatePageResponse> {
    return this.http.post<NotionCreatePageResponse>(`${this.baseURL}/pages`, newPage);
  }
}
