import { Component } from '@angular/core';

@Component({
    selector: 'sopra-steria',
    template: `
        <ul>
            <li><a routerLink="/student">Student</a></li>
            <li><a routerLink="/course">Kurs</a></li>
        </ul>
        
        <router-outlet></router-outlet>`,
        styleUrls: ['./app/app.component.css']
})

export class AppComponent {
    
   
}