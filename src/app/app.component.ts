import {Component, ViewChild} from "@angular/core";
import {Platform, Nav, MenuController} from "ionic-angular";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import {GlobalVars} from "../providers/app.global-vars";
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public _globalVars: GlobalVars,
    private storage: Storage,
    public menuCtrl: MenuController,
  ) {

    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      // 1 - Cargamos los datos del usuario desde el LocalStorage
      this.obtenerDatosUsuario();

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      // this.keyboard.disableScroll(true);

      //*** Activa la gestión del evento del botón atras
      this.activarEventoBotonAtras();

    });
  }




  obtenerDatosUsuario() {
    this.storage.keys().then((keys) => {

      // Comprobamos si es la primera vez que se abre la app
      if (keys.indexOf('first_time') === -1) {
        this._globalVars.datosUsuario['first_time'] = true;
        this.storage.set('first_time', true);
      } else {
        this.storage.get('first_time').then((valor) => {
          this._globalVars.datosUsuario['first_time'] = valor;
        });
      }

      if (keys.indexOf('usuario') > -1) {
        this.storage.get('usuario').then((valores) => {

          for (const valor in valores) {
            // alert(valor);
            this._globalVars.datosUsuario[valor] = valores[valor];
          }

          let ahora = moment();
          let caduca = moment(this._globalVars.datosUsuario['expires_date'], "YYYY-MM-DD HH:mm:ss");

          if (ahora.isBefore(caduca, 'second')) {
            this._globalVars.datosUsuario['isAuthenticated'] = true;
            this._globalVars.datosUsuarioCargados = true;
            this.rootPage = 'HomePage';
          } else {
            this._globalVars.datosUsuarioCargados = false;
            this.rootPage = 'LoginPage';
          }

        });
      } else {
        this._globalVars.datosUsuarioCargados = false;
        this.rootPage = 'LoginPage';
      }

    });
  }

  public changePage(page, isRoot = false) {
    this.menuCtrl.close();
    if (isRoot) {
      this.nav.setRoot(page);
    } else {
      this.nav.push(page);
    }

  }


  logout() {
    this._globalVars.mostrarPregunta(
      'Pregunta',
      '¿Está seguro que desea salir?',
      'Cancelar',
      'Sí',
      () => {},
      () => {
        this._globalVars.datosUsuario = [];
        this.storage.remove('usuario');
        this.nav.setRoot('LoginPage');
        this.menuCtrl.close();
      });
  }

  activarEventoBotonAtras() {
    let lastTimeBackPress = 0;
    let timePeriodToExit  = 2000;

    this.platform.registerBackButtonAction(() => {

      let active: any = this.nav.getActive();

      if (active.id == 'HomePage' || active.id == 'home' || active.id == 'LoginPage' || active.id == 'login') {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          this.platform.exitApp();
        } else {
          this._globalVars.mostrarToast('Presione otra vez para salir', 'bottom', 3000);
          lastTimeBackPress = new Date().getTime();
        }
      } else {
        this.nav.pop({});
      }
    });

  }


}

