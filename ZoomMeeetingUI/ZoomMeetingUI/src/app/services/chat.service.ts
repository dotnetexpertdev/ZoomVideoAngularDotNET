
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: HubConnection;

  messageReceived = new Subject<{ user: string; message: string }>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:7215/chatHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (user, message) => {
      this.messageReceived.next({ user, message });
    });
  }
  
  sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message);
  }
}
