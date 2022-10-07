import { Component } from '@angular/core';
import { ChatService } from './chat/chatservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMessage: string | undefined;
  messageList: string[] = [];
nc:string | undefined;
  constructor(private chatService: ChatService){

  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      //this.messageList.push(message);
      this.nc = message;
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}