import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Weather } from './weather';

@Injectable()
export class WeatherService{
	private weatherApiUrl: string = "http://api.openweathermap.org/data/2.5/weather?id=3143244&APPID=eee6bf64e1b4a3273e045681c197e44b&units=metric";
	private weatherData: Observable<string[]>;

	constructor(private http: Http) {}

	getWeather(): Observable<Weather> {
		return this.http
			.get(this.weatherApiUrl)
			.map((response: Response) => response.json() as Weather);
	}
}