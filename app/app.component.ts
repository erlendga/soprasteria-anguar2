import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';

import 'rxjs/Rx';

export class Student {
	id: number;
	name: string;
}

@Component({
  selector: 'sopra-steria',
  template: `<h1>Hello, {{title}}!</h1>
          <h2>Om {{student.name}}:</h2>
  			<div><label>Id: </label>{{student.id}}</div>
        <div><label>Navn: </label><input [(ngModel)]="student.name" placeholder="navn"></div><br>
		<section *ngIf='result'>
			<h2>{{result.course.code}} - {{result.course.name}}</h2>
			<div>
				<h3>Om kurset: </h3>
				<ul>
					<li>Studiepoeng: {{result.course.credit}} </li>
					<li>Vurderingsform: {{result.course.assessment[0].assessmentFormDescription}} </li>
					<li>Eksamensdato: {{result.course.assessment[0].date}} </li>
				</ul>
				
			</div>
		</section>`,
  providers: [CourseService]
})
export class AppComponent implements OnInit{
	title = "Online";

	student: Student = {
		id: 1,
		name: "Ola"
	}

	result: Course;

	constructor(private courseService: CourseService){ }

	ngOnInit(): void{
		this.courseService.getCourse().subscribe(result => console.log(this.result = result as Course));
		
	}

}