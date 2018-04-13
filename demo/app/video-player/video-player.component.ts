import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { VgFullscreenAPI } from 'videogular2/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public media;

  constructor(
    public videoSvc: VideoService,
    public fullScreen: VgFullscreenAPI,
    private router: Router
  ) { }

  ngOnInit() {
    // this.f_fullScreen();
    this.videoSvc.hideBack = false;
  }

  goBack() {
    const t = this;
    t.router.navigate(['']);
  }


}
