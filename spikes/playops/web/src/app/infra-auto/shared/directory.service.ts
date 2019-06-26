import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  private apiUrl = 'http://localhost:3000/api/v1';

  private DirectoryUrl = `${this.apiUrl}/directory`;

  constructor(private http: HttpClient) { }

  fetchDirectory () {
    return this.http.get(`${this.DirectoryUrl}`)
      .pipe(map(
        res => {
          return res;
        }
      ));
  }

  pasteDirectory(req: any) {
    return this.http.post(`${this.DirectoryUrl}/pasteDirectory`, req)
      .pipe(map(
        res => {
          return res;
        }
      ));
  }

  openDirectory (req: any) {
    return this.http.post(`${this.DirectoryUrl}/openDirectory`, req)
      .pipe(map(
        res => {
          return res;
        }
      ));
  }
}
