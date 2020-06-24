import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestsComponent } from './tests/tests.component';
import { AboutComponent } from './about/about.component';
import { TestDetailComponent } from './test-detail/test-detail.component';

const routes: Routes = [  
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'tests', component: TestsComponent },
    { path: 'tests/:searchText', component: TestsComponent },
    { path: 'test/:id', component: TestDetailComponent },
    { path: 'about', component: AboutComponent},

    {path: '**', redirectTo: ''}
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }