import { Component, OnInit, Inject, NgZone, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeetingService } from '../meeting.service';
import { ZoomMtg } from '@zoom/meetingsdk';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {  
  sdkKey = 'op3JoMu2Q7OAC4iu3k3E2Q'
  meetingNumber: string = '1234567';
  passWord: string = '1234567';
  isHost: boolean = true;
  userName: string = 'Rafi';
  userEmail: string = 'mohdrafionline@gmail.com';
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:4200'
  createdMeetingNumber: string | null | undefined;

  constructor(private activatedRoute: ActivatedRoute,private meetingService: MeetingService,public httpClient: HttpClient, @Inject(DOCUMENT) public document: Document  , private elementRef: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // Retrieve the meetingNumber parameter from the route
      const paramNumber = params.get('meetingNumber');

      // Check if paramValue is not null or undefined
      if (paramNumber !== null && paramNumber !== undefined) {
        this.meetingNumber = paramNumber;
      } else {
        // Handle the case when the parameter is null or undefined
        // You can choose to set a default value or handle it as needed
        this.meetingNumber = '123456789';
      }
      // Retrieve the meetingNumber parameter from the route
      const paramPassword = params.get('password');

      // Check if paramValue is not null or undefined
      if (paramPassword !== null && paramPassword !== undefined) {
        this.passWord = paramPassword;
      } else {
        // Handle the case when the parameter is null or undefined
        // You can choose to set a default value or handle it as needed
        this.passWord = '';
      }
     
    });; 
  }

  getSignature() {
    console.log(this.meetingNumber,this.userEmail,this.userName,this.passWord,this.isHost ? 1 : 0);
    const meetingData = {
      meetingNumber: this.meetingNumber,
      role: this.isHost ? 1 : 0
    };
  
      this.meetingService.createMeetingSignature(meetingData).subscribe(
        (response: any) => {
          
          this.startMeeting(response.signature)
        },
        (error: any) => {
          // Handle the error from the API
          console.error('Error creating signture:', error);
        });
  
  }

  startMeeting(signature: any) {

    const zmmtgRootElement = document.getElementById('zmmtg-root');

    if (!zmmtgRootElement) {
      console.error('Element with ID "zmmtg-root" not found.');
      return;  // Exit the function if the element is not found
    }

    zmmtgRootElement.style.display = 'block';
    this.ngZone.runOutsideAngular(() => {
      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        patchJsMedia: true,
        success: (success: any) => {
          console.log(success)
          ZoomMtg.join({
            signature: signature,
            sdkKey: this.sdkKey,
            meetingNumber: this.meetingNumber,
            passWord: this.passWord,
            userName: this.userName,
            userEmail: this.userEmail,
            tk: this.registrantToken,
            zak: this.zakToken,
            success: (success: any) => {
              console.log(success)
            },
            error: (error: any) => {
              console.log(error)
            }
          })
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    })
  }
  
}
