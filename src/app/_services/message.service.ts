import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  basUrl = environment.apiURl;

  constructor(private http: HttpClient) { }

  getMasseges(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container)

    return getPaginatedResults<Message[]>(this.basUrl + 'messages', params, this.http);
  }

  getMessagesThread(username: string) {
    return this.http.get<Message[]>(this.basUrl + 'messages/thread/' + username);
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.basUrl + 'messages', { recipientUsername: username, Content: content });
  }

  deleteMessage(id: number) {
    return this.http.delete(this.basUrl + 'messages/' + id);
  }
}
