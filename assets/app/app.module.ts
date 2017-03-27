import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessageService } from "./messages/message.service";

@NgModule({
    declarations: [
        AppComponent,
		MessageComponent,
		MessageListComponent,
		MessageInputComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
	providers: [MessageService]
})
export class AppModule {

}