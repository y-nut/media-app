import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCommonModule,
  MatIconModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  // MatPaginator,
  // MatTableDataSource,
  MatPaginatorModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DragScrollModule } from '../../src/ngx-drag-scroll';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { GithubComponent } from './github/github.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { VideoService } from './services/video.service';
import { VideoListComponent } from './video-list/video-list.component';


enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    FooterComponent,
    GithubComponent,
    HomeComponent,
    VideoPlayerComponent,
    VideoListComponent
  ],
  imports: [
    AppRoutingModule,
    DragScrollModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [
    VideoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
