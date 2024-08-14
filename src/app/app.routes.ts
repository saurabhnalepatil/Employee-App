import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {
        path:"",component:EmployeeComponent
    },
    {
        path:"employee", component:EmployeeComponent
    },
    {
        path:"user", component:UserComponent
    }
];
