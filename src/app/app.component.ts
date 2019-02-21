import {Component, ViewChild} from "@angular/core";
import {Platform, Nav, MenuController} from "ionic-angular";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import {GlobalVars} from "../providers/app.global-vars";

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

    this.platform.ready().then(async () => {
    	// 0 - Preconfiguración
			this.statusBar.styleDefault();
			this.statusBar.overlaysWebView(false);
			// this.keyboard.disableScroll(true)
			this.activarEventoBotonAtras();

    	// 1 - Mostramos splash
    	this.splashScreen.show();

      // 2 - Cargamos los datos del usuario desde el LocalStorage
      await this.obtenerDatosUsuario();

      // 3 - Quitamos splash
			this.splashScreen.hide();
    });
  }

	async obtenerDatosUsuario() {

  	let firstTime = await this.storage.get('first_time').catch(e => console.error(e)) || true;
		this._globalVars.datosUsuario['first_time'] = firstTime;
		await this.storage.set('first_time', firstTime);

		let datosUsuario = await this.storage.get('usuario').catch(e => console.error(e)) || null;
		this._globalVars.datosUsuario = datosUsuario;

		if (datosUsuario !== null) {
			this._globalVars.datosUsuario['isAuthenticated'] = true;
			this._globalVars.datosUsuarioCargados = true;
		}

		this.rootPage = 'HomePage';
	}


  public async changePage(page, isRoot = false) {
    await this.menuCtrl.close();
    if (isRoot) {
      await this.nav.setRoot(page);
    } else {
      await this.nav.push(page);
    }

  }

  logout() {
    this._globalVars.mostrarPregunta(
      'Pregunta',
      '¿Está seguro que desea salir?',
      'Cancelar',
      'Sí',
      () => {},
			async () => {
        this._globalVars.datosUsuario = [];
        await this.storage.remove('usuario');
				await this.menuCtrl.close();
        await this.nav.setRoot('LoginPage');
      });
  }

  activarEventoBotonAtras() {
    let lastTimeBackPress = 0;
    let timePeriodToExit  = 2000;

    this.platform.registerBackButtonAction(() => {

      let active: any = this.nav.getActive();

      if (active.id == 'HomePage' || active.id == 'home') {
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

