import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
import { MessagesComponent } from "./messages/messages.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessageService } from "./messages/message.service";
import { HeaderComponent } from "./header.component";
@NgModule({
    declarations: [
        AppComponent,
		MessageComponent,
		MessageListComponent,
		MessageInputComponent,
		MessagesComponent,
		HeaderComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent],
	providers: [MessageService]
})
export class AppModule {

}