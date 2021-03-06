import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AnimateModule } from './animate/animate.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestsComponent } from './tests/tests.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './registration/registration.component';
import { TestDialogComponent } from './test-dialog/test-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClickOutsideModule } from 'ng-click-outside'

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutComponent,
    TestsComponent,
    TestDetailComponent,
    FooterComponent,
    GoogleMapComponent,
    ContactComponent,
    AccountComponent,
    RegistrationComponent,
    TestDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatListModule,
    MatChipsModule,
    AnimateModule,
    MatSidenavModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestDialogComponent]
})
export class AppModule { }
