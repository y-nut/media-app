import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { DragScrollDirective } from '../../../src/ngx-drag-scroll';
import { HttpModule, Http, RequestOptionsArgs } from '@angular/http';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  viewProviders: [MatIconRegistry]
})

export class HomeComponent implements OnInit {

  title = 'app works!';
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  imagelist = [
    'luke.png',
    'chubaka.png',
    'boba.png',
    'c3po.png' ,
    'leia.png',
    'obi.png',
    'r2d2.png',
    'storm.png',
    'varder.png',
    'yoda.png',
    'yolo.png'
  ];
  leftNavDisabled = false;
  rightNavDisabled = false;

  dragScrollDom: any;
  dragScrollRef: ElementRef;
  dragScroll: DragScrollDirective;

  @ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;

  constructor(
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private element: ElementRef,
    private renderer: Renderer2,
    private http: Http,
    public videoSvc: VideoService
  ) {
    matIconRegistry
    .addSvgIcon('github',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg'))
    .registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
    const t = this;
    t.videoSvc.ds = t.ds;
    t.videoSvc.video.url =  'http://static.videogular.com/assets/videos/videogular.mp4';
    t.videoSvc.video.format = 'video/mp4';
    // t.videoSvc.getJSONVideos();
    t.videoSvc.hideBack = true;
  }

  imgResolve(obj) {
    const imgArr = obj.images[0];
    let url = imgArr.url;
    const id = obj.id;

    switch (id) {
      case '10-things-i-hate-about-you' :
        url = 'https://resizing.flixster.com/Nqt1FERw8P860UCt0_q1L1u7hDA=/206x305/v1.bTsxMTIwNzQ3NTtqOzE3NzI0OzEyMDA7MTgwMDsyNDAw';
      break;
      case '12-years-a-slave' :
        url = 'https://resizing.flixster.com/Ko43vrz24Gr72OvWgMbIhPRFSMY=/206x305/v1.bTsxMTE3NjQ5NTtqOzE3NzI0OzEyMDA7ODAwOzEyMDA';
      break;
      case '2-guns' :
        url = 'https://resizing.flixster.com/jwfs7DqLQFPRmrfX5J_un9xuo1Q=/206x305/v1.bTsxMTE3NDYwNTtqOzE3NzI0OzEyMDA7ODAwOzEyMDA';
      break;
      case '2001-a-space-odyssey' :
        url = 'https://resizing.flixster.com/LJuJTQ_D9bAmheF5WECTd4sUDBA=/206x305/v1.bTsxMTE2ODAwODtqOzE3NzI0OzEyMDA7ODAwOzEyMDA';
      break;
      case '21-jump-street' :
        url = 'https://resizing.flixster.com/ynuXYU-8XbOdQoJtVYq_WBcqSVc=/206x305/v1.bTsxMTE2NTY2NjtqOzE3NzI0OzEyMDA7ODAwOzEyMDA';
      break;
      default:
        url = url.replace('http', 'https');
      break;

    }

    return url;

  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }
  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }
  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

}
