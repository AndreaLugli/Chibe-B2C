import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Events } from 'ionic-angular';

@Injectable()
export class ExtendedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, public events: Events) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        if(res.text() == "not_logged") {
          this.events.publish('user:logout');
        }
      }
      return Observable.throw(res);
    };
  }

}
