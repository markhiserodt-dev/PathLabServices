import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestsComponent } from './tests/tests.component';
import { AboutComponent } from './about/about.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { ContactComponent } from './contact/contact.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [  
    { path: '', component: HomeComponent, data: {routeIdx: 0} },
    { path: 'tests', component: TestsComponent, data: {routeIdx: 1}},
    { path: 'tests/:searchText', component: TestsComponent, data: {routeIdx: 1} },
    { path: 'test-detail/:id', component: TestDetailComponent, data: {routeIdx: 1} },
    { path: 'about', component: AboutComponent, data: {routeIdx: 2} },
    { path: 'contact', component: ContactComponent, data: {routeIdx: 3} },

    { path: 'registration', component: RegistrationComponent, data: {routeIdx: 4} },

    { path: '**', redirectTo: '' }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }