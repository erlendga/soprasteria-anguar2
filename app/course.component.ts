import { Component } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';

import 'rxjs/Rx';

@Component({
    selector: 'my-course',
    template:`
    <div class="container">
        <div class="jumbotron col-md-7">
            <div class="row">
                <div class='searchField col-md-12'>
                    <h3>Søk etter kurs:</h3>
                    <div class="input-group">
                        <input #courseCode class="form-control" type="text" (keydown.enter)="getCourse(courseCode.value)" placeholder="kurskode (f.eks tdt4100)"/>
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" (click)="getCourse(courseCode.value)">Go!</button>
                        </span>
                    </div>
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
                        <br/>
                        <button class="btn btn-primary" type="button" >Meld meg på!</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <h3>Påmeldingsliste</h3>
            <ul>
                
            </ul>
        </div>
    </div>
    `,
    providers: [CourseService]
})

export class CourseComponent {
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