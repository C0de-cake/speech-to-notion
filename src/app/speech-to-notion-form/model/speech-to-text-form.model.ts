import {FormControl} from "@angular/forms";

export interface SpeechToTextForm {
  audioFile: FormControl<string>,
  documentName: FormControl<string>
}
