import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
@Component({
	selector: 'app-message-list',
	template: `
		<div class="col-md-8 col-md-offset-2">
			<app-message *ngFor="let message of messages" [message]="message" (editClicked)="onEditClicked($event)"></app-message>
		</div>
	`
})
export class MessageListComponent implements OnInit{
	messages: Message[];
	
	constructor(public messageService: MessageService){}
	
	ngOnInit(){
		this.messages = this.messageService.getMessages()
			.subscribe(
				(messages) => {
					console.log('messages in ngOnInit', messages);
					this.messages = messages;
				},
				err => console.log('error getting messages', err)
			); // we don't return a slice of the service messages, this sets the messages array to a REFERENCE of the MessageService messages array
	}
}