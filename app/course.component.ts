import { Component } from '@angular/core';
import { HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';
import { StudentComponent } from './student.component';

import 'rxjs/Rx';

@Component({
    selector: 'my-course',
    template:`
    <style>
        .list-group-item:nth-child(odd)
        {
            background-color: #E6F7FC;
        }
    </style>
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
                        <button class="btn btn-primary" type="button" (click)="getStudentAndCourseValue(courseCode.value, result.course.name)">Meld meg på!</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <h3>Påmeldte kurs</h3>
            <ul class="list-group">
                <li *ngFor="let course of courses" class="list-group-item">
                    {{course}}
                </li>
            </ul>
        </div>
    </div>
    `,
    providers: [CourseService],
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
                   transform: 'translateY(-100%)'
               }),
               animate('0.5s ease-in')
           ]),
           transition('* => void', [
               animate('0.5s ease-out', style({
                   opacity: 0,
                    transform: 'translateY(100%)'
               }))
           ])
       ])
   ]
})

export class CourseComponent {

    @HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	@HostBinding('style.position') get position() {
		return 'relative';
	}

    result: Course;

	constructor(private courseService: CourseService){ }

    courses: string[] = localStorage.getItem("courses") ? JSON.parse(localStorage.getItem("courses")) : [];

	getCourse(courseCode)
	{
        //console.log(StudentComponent);
		if(courseCode.length > 0)
		{
			this.courseService.getCourse(courseCode).subscribe(result => this.result = result);
		}
	}

    getStudentAndCourseValue(courseValue, courseName)
    {
        let courseNameAndDescription = courseValue + " - " + courseName;
        let isInArray: boolean = false;
        for(let course in this.courses)
        {
            if(this.courses.indexOf(courseNameAndDescription) > -1)
            {
                isInArray = true;
            }
        }
        if(isInArray == false)
        {
            this.courses.push(courseNameAndDescription);
        }
        else
        {
            alert("Du har allerede meldt deg på dette kurset");
        }
        
        //console.log(this.courses);
        localStorage.clear();
        localStorage.setItem("courses", JSON.stringify(this.courses));

    }
}