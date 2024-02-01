// meeting.component.ts
import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  meetingDataForm: FormGroup;
  meetingNumber:string='';
  meetingCreated: boolean = false;
  password:string='';
  constructor(private fb: FormBuilder,private meetingService: MeetingService) {
    this.meetingDataForm = this.fb.group({
      topic: ['Zoom Meeting'],
      type: [2], // Scheduled meeting
      startTime: [new Date()], // Start time in UTC
      duration: [5], // Duration in minutes
      timezone: ['America/Los_Angeles'],
      password: ['1234567'],
      settings: this.fb.group({
        joinBeforeHost: [true],
        muteUponEntry: [false],
        autoRecording: ['cloud'],
      })
    });
  
  }

  ngOnInit(): void {}
 
  createMeeting(): void {
    const meetingData = this.meetingDataForm.value;

    this.meetingService.createMeeting(meetingData).subscribe(
      (response: any) => {
        // Handle the successful response from the API
        console.log('Meeting created successfully:', response);
        this.meetingCreated = true;
        // Store MeetingId and Password if needed
        this.password = response.password;
 
        // Store the meeting number
        this.meetingNumber = response.meetingId;
      },
      (error: any) => {
        // Handle the error from the API
        console.error('Error creating meeting:', error);
      }
    );
}
}
