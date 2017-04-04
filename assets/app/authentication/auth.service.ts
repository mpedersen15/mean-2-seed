import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class AuthService{
	
	constructor(public http: Http){}
	
	signup(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/users/', body, {headers})
			.map((res: Response) => res.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}
	
	login(user: User){
		console.log('login body', user);
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/users/login/', body, {headers})
			.map((res: Response) => res.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}
	
	logout(){
		localStorage.clear();
	}
	
	isLoggedIn(){
		return localStorage.getItem('token');
	}
}