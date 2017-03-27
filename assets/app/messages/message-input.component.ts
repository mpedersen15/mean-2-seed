import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service.ts';
import { Message } from './message.model.ts';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
	
	constructor(public messageService: MessageService){}
	
	submitMessageForm(form: NgForm){
		console.log('form', form);
		this.messageService.addMessage(new Message(form.value.content, 'Matt'));
		form.resetForm();
	}
}