import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Course } from './course';

@Injectable()
export class CourseService{
	private courseApiUrl: string = "http://www.ime.ntnu.no/api/course/";

	constructor(private http: Http) {}

	getCourse(courseCode:string): Observable<Course> {
		return this.http
			.get(this.courseApiUrl + courseCode)
			.map((response: Response) => response.json() as Course);
	}
}
