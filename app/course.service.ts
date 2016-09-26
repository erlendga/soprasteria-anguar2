import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Course } from './course';

@Injectable()
export class CourseService{
	private courseApiUrl: string = "http://www.ime.ntnu.no/api/course/TDT4110";
	private courseData: Observable<string[]>;

	constructor(private http: Http) {}

	getCourse(): Observable<Course> {
		return this.http
			.get(this.courseApiUrl)
			.map((response: Response) => response.json() as Course);
	}
}
