// meeting.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  //private apiBaseUrl = 'https://localhost:7215'; // Update with your API URL
  private apiBaseUrl='https://1e2d-2401-4900-1f30-7556-5050-d163-e7ac-83d.ngrok-free.app';
  constructor(private http: HttpClient) {}
  createMeeting(meetingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/api/auth/create-meeting`, meetingData)
    .pipe(
      tap((response: any) => console.log('Server Response:', response))
    );
  }
  createMeetingSignature(meetingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/api/auth/create-meeting-signature`, meetingData)
    .pipe(
      tap((response: any) => console.log('Server Response:', response))
    );
  }
}
