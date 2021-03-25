import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss'],
})
export class Component1Component implements OnInit {
  msg: string = '';
  msgToPublish: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.onMessage().subscribe((msg: string) => {
      this.msg = msg;
    });
  }

  publishMessage(): void {
    this.messageService.sendMessage(this.msgToPublish);
    this.msgToPublish = '';
  }
}
