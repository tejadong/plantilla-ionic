import { Injectable } from '@angular/core';
import {AlertController, LoadingController, ToastController, NavController, App} from 'ionic-angular';

@Injectable()
export class GlobalVars {

  // Varibales de usuario
  public datosUsuario = [];
	public datosUsuarioCargados = false;

  // Variables para conectar con una API REST
	public protocolApiRest = 'http://';
  public urlDominio = 'ip/path/file.php';
  public puertoDominio = '';

  // Variables para Url's
  public uriCompleta = this.protocolApiRest + this.urlDominio + this.puertoDominio + '/api';
  public ejemploUrl = this.uriCompleta + '/login';


  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private app: App
  ) {}

  // ------------------------- Funciones para mensajes de alertas -------------------------
  public mostrarAlerta(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  public mostrarPregunta(title, message, textCancel, textConfirm, funcCancel, funcConfirm) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: textCancel,
          role: 'cancel',
          handler: () => {
            funcCancel();
          }
        },
        {
          text: textConfirm,
          handler: () => {
            funcConfirm();
          }
        }
      ]
    });
    alert.present();
  }

  public mostrarToast(mensaje, posicion, duracion) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion,
      cssClass: 'toast-personalizado'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }
  // ------------------------- Fin Funciones para mensajes de alertas -------------------------

  public mostrarModalCargando() {
   return this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img class="cargando" src="assets/imgs/cargando.svg">`
    });
  }

  public comprobarErrorPeticionHttp(fallo: any) {
   if (fallo.status >= 400 && fallo.status < 500) {
			if (fallo.status === 401) {
        let nav: NavController = this.app.getRootNav();
        if ( !(nav.getActive().id == 'LoginPage' || nav.getActive().id == 'login') ) {
          nav.setRoot('LoginPage');
        }
        this.mostrarToast('Sesión caducada', 'bottom', 3000);
      } else {
			 this.mostrarToast(fallo.error.error_description, 'bottom', 3000);
      }

		} else if (fallo.status >= 500 && fallo.status <= 512) {
		 this.mostrarToast('Error en el servidor', 'bottom', 3000);
		} else {
		 this.mostrarToast('Error desconocido', 'bottom', 3000);
		}
  }

}
