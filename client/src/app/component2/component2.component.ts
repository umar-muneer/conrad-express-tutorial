import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.scss'],
})
export class Component2Component implements OnInit {
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
