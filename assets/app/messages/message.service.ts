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
		return this.messages;
	}
	
	deleteMessage(message: Message){
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}