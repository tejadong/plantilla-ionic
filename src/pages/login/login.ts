import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, AlertController, ToastController, MenuController, IonicPage} from "ionic-angular";
import {GlobalVars} from "../../providers/app.global-vars";
import {ApiService} from "../../providers/Api";
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import 'moment/locale/es';
import {Network} from "@ionic-native/network";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
	public credencialesLogin: any = {
		username: '',
		password: '',
		recordar: false
	};
	public errorMsgLogin = null;

  constructor(
  	private _fb: FormBuilder,
		public nav: NavController,
		public forgotCtrl: AlertController,
		public menu: MenuController,
		public toastCtrl: ToastController,
		private _globalVars: GlobalVars,
		private _apiService: ApiService,
		private storage: Storage,
    private network: Network,)
	{
	  console.log('login this._globalVars.datosUsuario: ', this._globalVars.datosUsuario);
    this.menu.swipeEnable(false);

		this.credencialesLogin.username = '';
		this.credencialesLogin.password = '';
		this.credencialesLogin.recordar = false;

		if (this._globalVars.datosUsuario['credencialesLogin'] != null && this._globalVars.datosUsuario['credencialesLogin'].recordar) {
			this.credencialesLogin = this._globalVars.datosUsuario['credencialesLogin'];
		}
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      usuario: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
			,
			recordar: ['']
    });
  }

	ionViewWillEnter() {
		console.log('ionViewWillEnter login');
	}

  // login and go to home page
  login() {
    this.nav.setRoot('HomePage');
    // if (this.isConnected()) {
    //   let modalCargando = this._globalVars.mostrarModalCargando();
    //   modalCargando.present();
    //   this.errorMsgLogin = null;
    //
    //   this._apiService.login(this.credencialesLogin).subscribe(
    //     (correcto) => {
    //       console.log('onSuccess:', correcto);
    //       // correcto.body['password'] = this.credencialesLogin.password;
    //       correcto.body['expires_date'] = moment().add(correcto.body['expires_in'], 'seconds').format('YYYY-MM-DD HH:mm:ss');
    //       // correcto.body['correo'] = this.credencialesLogin.username;
    //       // delete correcto.body.notificaciones;
    //       if (this.credencialesLogin.recordar) {
    //         correcto.body['credencialesLogin'] = this.credencialesLogin;
    //       } else {
    //         correcto.body['credencialesLogin'] = {
    //           username: '',
    //           password: '',
    //           recordar: false
    //         };
    //       }
    //       this.storage.set('usuario', correcto.body);
    //       for (const key in correcto.body) {
    //         this._globalVars.datosUsuario[key] = correcto.body[key];
    //       }
    //       // this._globalVars.datosUsuario['password'] = correcto.body['password'];
    //       // this._globalVars.datosUsuario['correo'] = correcto.body['correo'];
    //       this._globalVars.datosUsuario['isAuthenticated'] = true;
    //       this._globalVars.mostrarToast('Credenciales correctos.', 'bottom', 3000);
    //       this._globalVars.datosUsuarioCargados = true;
    //
    //       this.nav.setRoot('HomePage');
    //     },
    //     (fallo) => {
    //       console.log('onError:', fallo);
    //       // fallo.error = JSON.parse(fallo.error);
    //       modalCargando.dismiss();
    //       this._globalVars.comprobarErrorPeticionHttp(fallo);
    //       this._globalVars.datosUsuarioCargados = false;
    //     },
    //     () => {
    //       console.log('onComplete:', 'terminado');
    //       modalCargando.dismiss();
    //     }
    //   );
    // } else {
    //   this._globalVars.mostrarToast('No está conectado a internet', 'bottom', 3000);
    // }
  }

  private isConnected(): boolean {
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

}
