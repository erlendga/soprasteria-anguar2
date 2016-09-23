import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './weather';

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
			<h3> Været i {{result.name}}: </h3>
			<h4>{{result.weather[0].description}}</h4>
			<div>
				<img [src]="'http://openweathermap.org/img/w/'+result.weather[0].icon+'.png'"><span style='font-size:28px; font-weight:bold'>{{result.main.temp}} &#176;C</span>
			</div>
		</section>`,
  providers: [WeatherService]
})
export class AppComponent implements OnInit{
	title = "Online";

	student: Student = {
		id: 1,
		name: "Ola"
	}

	result: Weather;

	constructor(private weatherService: WeatherService){ }

	ngOnInit(): void{
		this.weatherService.getWeather().subscribe(result => console.log(this.result = result as Weather));
		
	}

}