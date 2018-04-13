import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoListComponent } from './video-list/video-list.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: {
      name: 'home'
    }
  },
  {
    path: 'list',
    component: VideoListComponent,
    pathMatch: 'full',
    data: {
      name: 'list'
    }
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'video',
    component: VideoPlayerComponent,
    pathMatch: 'full',
    data: {
      name: 'video'
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
