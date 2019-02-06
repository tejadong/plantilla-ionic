import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, LOCALE_ID} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {ApiService} from "../providers/Api";
import {GlobalVars} from "../providers/app.global-vars";
import {ComponentsModule} from "../components/components.module";
import {Network} from '@ionic-native/network';
import {IonicStorageModule} from "@ionic/storage";
import {PipesModule} from "../pipes/pipes.module";

import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
import {LongPressModule} from "ionic-long-press";

import {IonicImageViewerModule} from 'ionic-img-viewer';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    IonicStorageModule.forRoot({
      name: 'plantilla',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    LongPressModule,
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  exports: [
    ComponentsModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    GlobalVars,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    [{
      provide: LOCALE_ID, useValue: 'es-ES'
    }]
  ]
})
export class AppModule {}
