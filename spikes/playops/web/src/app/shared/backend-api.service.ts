import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  public apiBaseUrl = 'http://localhost:3000/api/v1';

  constructor() { }
}
