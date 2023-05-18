import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import { OverviewComponent } from './pages/overview/overview.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { SignupComponent } from './pages/signup/signup.component';
import { ArchivedetailsComponent } from './pages/overview/modal/archivedetails/archivedetails.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatTableModule} from "@angular/material/table";
import { ArchiveComponent } from './components/archive/archive.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorService} from "./services/http.interceptor.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    OverviewComponent,
    AppbarComponent,
    SignupComponent,
    ArchivedetailsComponent,
    FooterComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    FlexModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
