import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; // , HttpParams
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout';
import {Observable} from "rxjs/Observable";
import {GlobalVars} from "./app.global-vars";

@Injectable()
export class ApiService {

  constructor(
    private _http: HttpClient,
    private _globalVars: GlobalVars
  ) {}

  // LOGUEO DE LA APLICACIÓN
  public login(credenciales: any): Observable<any> {
    // const body = new HttpParams()
    //     .set('grant_type', 'password')
    //     .set('client_id', '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4')
    //     .set('client_secret', '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k')
    //     .set('username', credenciales.username)
    //     .set('password', credenciales.password);

		const body = JSON.stringify({
			grant_type: 'password',
			client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
			client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
			username: credenciales.username,
			password: credenciales.password
		});

    return this._http.post(
      'URL LOGIN',
      body,
{
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          observe: 'response'
        }
    );
  }

}
