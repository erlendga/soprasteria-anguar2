import { Component } from '@angular/core';

export class Student {
	id: number;
	name: string;
}

@Component({
  selector: 'sopra-steria',
  template: `<h1>Hello, {{title}}!</h1>
  			<div>`
})
export class AppComponent {
	title = "Online";

	student: Student = {
		id: 1,
		name: "Ola"
	}
}