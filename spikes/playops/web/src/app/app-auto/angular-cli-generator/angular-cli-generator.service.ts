import { Injectable } from '@angular/core';
import { BackendApiService } from '../../shared/backend-api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularCliGeneratorService {

  private apiBaseUrl = this.backendApiService.apiBaseUrl;
  private AngularGeneratorUrl = `${this.apiBaseUrl}/angular-generator`;

  constructor(
    private backendApiService: BackendApiService,
    private http: HttpClient
  ) { }

  checkAPI (req: any) {
    return this.http.post(`${this.AngularGeneratorUrl}/check`, req)
       .pipe(map(
          res => {
           return res;
          }
       ));
  }

  generateAngularCli(req: any) {
    return this.http.post(`${this.AngularGeneratorUrl}/generate-angular-cli`, req)
      .pipe(map(
        res => {
          return res;
        }
      ));
  }
}
