import { Injectable } from '@angular/core';
import {VgAPI, VgFullscreenAPI} from 'videogular2/core';
import { Router } from '@angular/router';
import { DragScrollDirective } from '../../../src/ngx-drag-scroll';
import { Location } from '@angular/common';

export class JSONRESULT {
  constructor(
    public totalCount?: number,
    public entries?: Array<any>
  ) { }
}

export class VIDEO {
  constructor(
    public duration?: number,
    public format?: string,
    public geoLock?: boolean,
    public height?: number,
    public id?: string,
    public language?: string,
    public url?: string,
    public width?: number
  ) { }
}

@Injectable()
export class VideoService {

  public video: VIDEO = new VIDEO();
  public preload = 'auto';
  public api: VgAPI;
  public res: JSONRESULT = new JSONRESULT();
  public videoObj: any;
  public hideBack: boolean;
  public ds: DragScrollDirective;
  public pageName: string;
  public fullScreen: VgFullscreenAPI;
  public localDB: Array<any>;

  constructor(
    private router: Router,
    private _location: Location
  ) { }

  public getJSONVideos() {
    const t = this;
    const path = '/videos.json';
    // console.log(path);
    const init: RequestInit = {};

    const status = function (response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    };

    const json = function (response) {
      return response.json();
    };

    fetch(path, init)
    .then(status)
    .then(json)
    .then(function(data) {
      // console.log('Request succeeded with JSON response', data);
      t.res = Object.assign({}, data);
      // console.log(t.res);
    }).catch(function(error) {
      // console.log('Request failed', error);
    });
  }

  selectVideo(obj) {
    // console.log('item tapped');
    const t = this;
    const meta = {
      id : obj.id,
      title : obj.title
    };
    t.videoObj =  Object.assign({} , obj.contents[0], meta );
    t.video = new VIDEO();

    t.video = {
      url : t.videoObj.url.replace('http', 'https'),
      format : 'video/' + t.videoObj.format
    };

    t.router.navigate(['video']);

  }

  onPlayerReady(api: VgAPI) {
    // console.log('onPlayerReady');
    const t = this;
    // https://videogular.github.io/videogular2/docs/getting-started/using-the-api.html
    t.api = api;

    t.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // console.log('ended');
        // Set the video to the beginning
        t.api.getDefaultMedia().currentTime = 0;

        t.goBack();
      }
    );

    t.api.getDefaultMedia().subscriptions.play.subscribe(
      () => {
        // console.log(t.videoObj);
        const id = t.videoObj.id;
        let counted: number;

        const obj = {
          id: t.videoObj.id,
          currentTime: t.api.getDefaultMedia().currentTime,
          watched: 1,
          title : t.videoObj.title
        };

        const finish = function() {
          const json = JSON.stringify( t.localDB );
          localStorage.setItem('localDB', json);
          return;
        };

        if ( t.localDB.length === 0 ) {
          t.localDB.push(obj);
          finish();
        } else {
          counted = 0;
          t.localDB.filter( (el, i) => {
            if ( el.id === obj.id ) {
              counted++;
              if ( obj.currentTime === 0 ) {
                t.localDB[i].watched++;
              }
            }

            if ( i + 1 === t.localDB.length || counted > 0 ) {
              if (counted === 0) {
                t.localDB.push(obj);
              }
              finish();
              return;
            }
          });
        }
      }
    );

  }

 moveLeft() {
    const t = this;
    t.ds.moveLeft();
  }

  moveRight() {
    const t = this;
    t.ds.moveRight();
  }

  goBack() {

    this._location.back();

  }



}
