import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from  './student.component';
import { CourseComponent } from './course.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/student',
        pathMatch: 'full'
    },
    {
        path: 'student',
        component: StudentComponent
    },
    {
        path: 'course',
        component: CourseComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);