import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApplicationConfig } from '../models/config.model';
@Injectable()
export class AppConfig {
    // static settings: AppConfig;
    constructor(private http: HttpClient) {}
    load() {
        const jsonFile = `config/config.${environment.production?'prod':'dev'}.json`;
        return new Promise<void>((resolve, reject) => {
          this.http.get<ApplicationConfig>(jsonFile).toPromise().then((response: ApplicationConfig) => {
            Object.assign(this, this.upperCaseKey(response));
            console.log(this);
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }

  private upperCaseKey(obj: any): any {
    for (var key in obj) {
      obj[key.toUpperCase()] = obj[key];
      delete(obj[key])
    }

    return obj
  }
}
