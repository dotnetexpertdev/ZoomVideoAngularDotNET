import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingService } from './meeting.service';

import { ChatService } from './services/chat.service';
import { FormsModule } from '@angular/forms';
import { ZoomComponent } from './zoom/zoom.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    
    ZoomComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
     BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [MeetingService], // Provide MeetingService here
  bootstrap: [AppComponent]
})
export class AppModule { }
