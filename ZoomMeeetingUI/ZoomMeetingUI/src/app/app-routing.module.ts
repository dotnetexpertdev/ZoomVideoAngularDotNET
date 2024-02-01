import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './meeting/meeting.component';
import { ZoomComponent } from './zoom/zoom.component';

const routes: Routes = [
  { path: '', component: MeetingComponent },
  { path: 'meeting', component: MeetingComponent },
   { path: 'zoom', component: ZoomComponent },
   { path: 'zoom/:meetingNumber/:password', component: ZoomComponent }
  // Add other routes as needed
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
