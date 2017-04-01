import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service.ts';
import { Message } from './message.model.ts';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit{
	message: Message;
	constructor(public messageService: MessageService){}
	
	submitMessageForm(form: NgForm){
		console.log('form', form);
		if (this.message){
			this.message.content = form.value.content;
			this.messageService.updateMessage(this.message)
				.subscribe( res => {
					console.log('res', res);
				});
			this.message = null;
		}else{
			this.messageService.addMessage(new Message(form.value.content, 'Matt'))
				.subscribe(res => {
					console.log('add message subscribe', res);
				});
		}
		
		form.resetForm();
	}
	
	ngOnInit(){
		this.messageService.edittingMessage.subscribe(
			(message: Message) => {
				this.message = message;
			}
		)
	}
	
	clearForm(form){
		this.message = null;
		form.resetForm();
	}
}