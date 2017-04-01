import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	template: `
		<header>
			<nav class="col-md-8 col-md-offset-2">
				<ul class="nav nav-pills">
					<li routerLinkActive="active"><a href="" [routerLink]="['/message']" >Messenger</a></li>
					<li routerLinkActive="active"><a href="" [routerLink]="['/auth']" >Authentication</a></li>
				</ul>
			</nav>
		</header>
	`
})
export class HeaderComponent{
	
}