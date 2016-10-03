import { Component } from '@angular/core';

import { HostBinding, trigger, transition, animate, style, state } from '@angular/core';

export class Student 
{
	id: number;
	name: string;
}

@Component({
  selector: 'my-student',
  template: `
  <div class='container'>
	<div class="jumbotron">
		<h1>Hello, {{title}}!</h1>
		<h2>Om {{student.name}}:</h2>
		<div class="row">
			<div class="col-md-12">
				<label>Id: </label>{{student.id}}
			</div>
			<div class="col-md-4">
				<label>Navn: </label>
				<input class="form-control" [(ngModel)]="student.name" (keyup)="saveStudent(student)" placeholder="navn">
			</div>
		</div>
		<br>
	</div>

</div>`,
animations: [
       trigger('routeAnimation', [
           state('*',
               style({
                   opacity: 1,
                   transform: 'translateX(0)'
               })
           ),
           transition('void => *', [
               style({
                   opacity: 0,
                   transform: 'translateX(-100%)'
               }),
               animate('0.5s ease-in')
           ]),
           transition('* => void', [
               animate('0.5s ease-out', style({
                   opacity: 0,
                    transform: 'translateX(100%)'
               }))
           ])
       ])
   ]
})


export class StudentComponent
{
	@HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	@HostBinding('style.position') get position() {
		return 'absolute';
	}

	@HostBinding('style.width') get width() {
		return '100%';
	}

	title = "Online";

	student: Student = 
	{
		id: 1,
		name: "Ola"
	}

	saveStudent(student){
		localStorage.setItem("person", JSON.stringify(student));
	} 

	
}

