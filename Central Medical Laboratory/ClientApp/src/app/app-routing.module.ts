import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestsComponent } from './tests/tests.component';
import { AboutComponent } from './about/about.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [  
    { path: '', component: HomeComponent, data: {animation: 'Home'} },
    { path: 'tests', component: TestsComponent, data: {animation: 'Tests'}},
    { path: 'tests/:searchText', component: TestsComponent, data: {animation: 'Tests'} },
    { path: 'test-detail/:id', component: TestDetailComponent, data: {animation: 'Test-Detail'} },
    { path: 'about', component: AboutComponent, data: {animation: 'About'} },
    { path: 'contact', component: ContactComponent, data: {animation: 'Contact'} },

    { path: '**', redirectTo: '' }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }