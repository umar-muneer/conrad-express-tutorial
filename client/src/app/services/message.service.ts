import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new Subject<string>();

  constructor() {}

  onMessage(): Observable<string> {
    return this.messageSource.asObservable();
  }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}
