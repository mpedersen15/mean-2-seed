import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
import { MessagesComponent } from "./messages/messages.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessageService } from "./messages/message.service";
import { AuthService } from "./authentication/auth.service";
import { HeaderComponent } from "./header.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { SignupComponent } from './authentication/signup.component';
import { LoginComponent } from './authentication/login.component';
import { LogoutComponent } from './authentication/logout.component';
import { ErrorComponent } from './errors/error.component';
import { myRoutes } from './app.routes';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
		MessageComponent,
		MessageListComponent,
		MessageInputComponent,
		MessagesComponent,
		HeaderComponent,
		AuthenticationComponent,
		SignupComponent,
		LoginComponent,
		LogoutComponent,
		ErrorComponent
    ],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, myRoutes, HttpModule],
    bootstrap: [AppComponent],
	providers: [MessageService, AuthService]
})
export class AppModule {

}