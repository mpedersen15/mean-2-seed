import { Component } from '@angular/core';
import { Message } from './messages/message.model';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
	
})
export class AppComponent {
    messages: Message[] = [
		new Message('A new message', 'Matt'),
		new Message('A second message', 'Matt'),
	];
	
	onEditClicked(content: string){
		this.message.content = content
	}
}