import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public videoSvc: VideoService,
    // private _location: Location
  ) { }

  ngOnInit() {
  }
/*
  goBack() {

    this._location.back();

  }
*/
}
