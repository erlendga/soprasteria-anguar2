import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    selector: 'my-course-detail',
    template: `
    <span class="glyphicon glyphicon-chevron-left pointer" (click)="goBack()"><span class="back">Tilbake</span></span>
    <div class="container">
        <div class="jumbotron">
            <div class="row" *ngIf="result">
                <h2> {{result.course.code}} - {{result.course.name}} </h2>
                <ul class="list-group col-md-6">
                    <li class="list-group-item">Studiepoeng: {{result.course.credit}}</li>
                    <li class="list-group-item">Studienivå: {{result.course.studyLevelName}}</li>
                    <li class="list-group-item">Undervisningsspråk: {{result.course.educationLanguage[0].name}}</li>
                    <li class="list-group-item">Vurderingsform: {{result.course.assessment[0].assessmentFormDescription}}</li>
                    <li class="list-group-item">Undervises: {{result.course.educationTerm[0].startTerm}} - {{result.course.educationTerm[0].year}}</li>
                    <li class="list-group-item">Eksamensdato: {{result.course.assessment[0].date}}</li>
                    
                </ul>
            </div>
        </div>
    </div>`,
    styles: [`
        .list-group-item:nth-child(odd)
        {
            background-color: #758E96;
            color: white;
        }
        .pointer
        {
            cursor: pointer;
        }
        .back {
            font-size:20px;
            font-family: helvetica;
        }
        .glyphicon{
            font-size: 20px;
            margin-left: 15px;
        }
    `],
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
                    transform: 'translateY(-100%)'
                }))
            ])
        ])
    ]
})

export class CourseDetailComponent implements OnInit{
    constructor(private courseService: CourseService, private route: ActivatedRoute, private location: Location){

    }

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

    result: Course;

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (params['id'].length > 0) {
                this.courseService.getCourse(params['id']).subscribe(result =>console.log(this.result = result));
            }
        });
    }

    goBack(): void{
        this.location.back();
    }
}