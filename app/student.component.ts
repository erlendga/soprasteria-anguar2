import { Component } from '@angular/core';


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
				<input class="form-control" [(ngModel)]="student.name" (keyup)="test(student)" placeholder="navn">
			</div>
		</div>
		<br>
	</div>

</div>`
})


export class StudentComponent
{
	title = "Online";

	student: Student = 
	{
		id: 1,
		name: "Ola"
	}

	test(student){
		localStorage.setItem("person", JSON.stringify(student));
	} 
}

