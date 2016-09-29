import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';

import 'rxjs/Rx';

export class Student 
{
	id: number;
	name: string;
}

@Component({
  selector: 'sopra-steria',
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
				<input class="form-control" [(ngModel)]="student.name" placeholder="navn">
			</div>
		</div>
		<br>
	</div>
	<div class='searchField col-md-4'>
		<h3>Søk etter kurs:</h3>
		<div class="input-group">
			<input #courseCode class="form-control" type="text" (keydown.enter)="getCourse(courseCode.value)" placeholder="kurskode"/>
			<span class="input-group-btn">
				<button class="btn btn-default" type="button" (click)="getCourse(courseCode.value)">Go!</button>
			</span>
		</div>
	</div><br>

	<div class="row" *ngIf='result && result.course != null'>
		<div class="col-md-12">
			<h2>{{result.course.code}} - {{result.course.name}}</h2>
			<div>
				<h3>Om kurset: </h3>
				<ul>
					<li>Studiepoeng: {{result.course.credit}} </li>
					<li>Vurderingsform: {{result.course.assessment[0].assessmentFormDescription}} </li>
					<li>Eksamensdato: {{result.course.assessment[0].date}} </li>
				</ul>
				
			</div>
		</div>
	</div>

</div>`,
  providers: [CourseService]
})

export class AppComponent
{
	title = "Online";

	student: Student = 
	{
		id: 1,
		name: "Ola"
	}

	result: Course;

	constructor(private courseService: CourseService){ }

	getCourse(courseCode)
	{
		if(courseCode.length > 0)
		{
			this.courseService.getCourse(courseCode).subscribe(result => this.result = result as Course);
		}
	}

	
}

