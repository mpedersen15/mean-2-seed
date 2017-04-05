import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Message } from './message.model';
import 'rxjs/Rx';

@Injectable()
export class MessageService {
	private messages: Message[] = [];
	edittingMessage = new EventEmitter();
	
	constructor(public http: Http){}
	
	addMessage(message: Message){
		//this.messages.push(message);
		console.log('message added', this.messages);
		const body = JSON.stringify(message);
		const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token') : '';
		var headers = new Headers({'Content-Type': 'application/json'})
		return this.http.post('http://localhost:3000/messages/' + token, body, {headers})
			.map( res => {
				const result = res.json();
				console.log('result in addMessage', result);
				const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
				this.messages.push(message);
				return message;
			});
	}
	
	getMessages(){
		return this.http.get('http://localhost:3000/messages/')
			.map(res => {
				const messages = res.json().obj;
				let transformedMessages: Message[] = [];
				for (let message of messages){
					transformedMessages.push(new Message(message.content, 'Dummy Author', message._id, null));
				}
				this.messages = transformedMessages;
				console.log('in getMessages', transformedMessages);
				return transformedMessages;
			})
	}
	
	deleteMessage(message: Message){
		this.messages.splice(this.messages.indexOf(message), 1);
		const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token') : '';
		return this.http.delete('http://localhost:3000/messages/'+message.messageId + token)
			.map( res => res.json());
	}
	
	updateMessage(message: Message){
		console.log('in update message', message);
		const body = JSON.stringify(message);
		const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token') : '';
		var headers = new Headers({'Content-Type': 'application/json'})
		return this.http.patch('http://localhost:3000/messages/'+message.messageId + token, body, {headers})
			.map( res => res.json());
	}
	
	editMessage(message: Message){
		console.log('in message service editMessage');
		this.edittingMessage.emit(message);
	}
}