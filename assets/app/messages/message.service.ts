import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Message } from './message.model';
import 'rxjs/Rx';

@Injectable()
export class MessageService {
	private messages: Message[] = [
		new Message('A new message', 'Matt'),
		new Message('A second message', 'Matt'),
	];
	
	constructor(public http: Http){}
	
	addMessage(message: Message){
		this.messages.push(message);
		console.log('message added', this.messages);
		const body = JSON.stringify(message);
		var headers = new Headers({'Content-Type': 'application/json'})
		return this.http.post('http://localhost:3000/messages/', body, {headers})
			.map( res => res.json());
			

	}
	
	getMessages(){
		return this.http.get('http://localhost:3000/messages/').map(res => {
			const messages = res.json().obj;
			let transformedMessages: Message[] = [];
			for (let message of messages){
				transformedMessages.push(new Message(message.content, 'Dummy Author', message.id, null));
			}
			//this.messages = transformedMessages;
			console.log('in getMessages', transformedMessages);
			return transformedMessages;
		});
	}
	
	deleteMessage(message: Message){
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}