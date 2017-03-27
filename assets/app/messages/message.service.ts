import { Injectable } from '@angular/core';
import { Message } from './message.model';


@Injectable()
export class MessageService {
	private messages: Message[] = [
		new Message('A new message', 'Matt'),
		new Message('A second message', 'Matt'),
	];
	
	addMessage(message: Message){
		this.messages.push(message);
		console.log('message added', this.messages);
	}
	
	getMessages(){
		return this.messages;
	}
	
	deleteMessage(message: Message){
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}