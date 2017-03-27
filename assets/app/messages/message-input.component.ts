import { Component } from '@angular/core';
import { MessageService } from './message.service.ts';
import { Message } from './message.model.ts';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
	
	constructor(public messageService: MessageService){}
	
	saveMessage(message: string){
		console.log('message', message);
		this.messageService.addMessage(new Message(message, 'Matt'));
	}
}