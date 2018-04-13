import { Component, HostListener, OnInit } from '@angular/core';
import { VideoService } from './services/video.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public videoSvc: VideoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const t = this;

    // console.log(event);
    // console.log(t.videoSvc.pageName);

    try {
      switch (t.videoSvc.pageName) {
        case 'home' :
          switch (event.keyCode) {
            case KEY_CODE.RIGHT_ARROW:
              t.videoSvc.moveRight();
            break;
            case KEY_CODE.LEFT_ARROW:
              t.videoSvc.moveLeft();
            break;
            case KEY_CODE.ESCAPE:
            break;
            case KEY_CODE.ENTER:
            break;
          }
        break;

        case 'video':
          switch (event.keyCode) {
            case KEY_CODE.RIGHT_ARROW:
            break;
            case KEY_CODE.LEFT_ARROW:
            break;
            case KEY_CODE.ESCAPE:
              t.router.navigate(['']);
            break;
            case KEY_CODE.ENTER:
              const media = Object.assign({}, t.videoSvc.api.getDefaultMedia());

              // console.log(media);

              switch ( media.state ) {
                case 'paused' :
                  t.videoSvc.api.getDefaultMedia().play();
                break;
                case 'playing' :
                  t.videoSvc.api.getDefaultMedia().pause();
                break;
              }
            break;
          }
        break;


      }


    } catch (error) {

    }

  }

  listenRoute() {
    const t = this;
    t.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe(event => {
      let currentRoute = this.route.root;
      while (currentRoute.children[0] !== undefined) {
        currentRoute = currentRoute.children[0];
      }
      // console.log(currentRoute.snapshot.data);

      t.videoSvc.pageName = currentRoute.snapshot.data.name;
    });
  }

  ngOnInit() {
    this.videoSvc.getJSONVideos();
    this.listenRoute();
    this.setLocalDB();

  }

  setLocalDB() {
    const t = this;
    const f = function() {
      t.videoSvc.localDB = JSON.parse( localStorage.getItem('localDB') );
    };

    f();

    if ( !t.videoSvc.localDB ) {
      const arr = JSON.stringify([]) ;
      localStorage.setItem('localDB', arr);

      f();
    }

  }

}
