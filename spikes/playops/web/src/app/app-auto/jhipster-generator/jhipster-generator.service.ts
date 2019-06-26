import { Injectable } from '@angular/core';
import { BackendApiService } from '../../shared/backend-api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { JhipsterGeneratorModel } from './jhipster-generator-model';
import { GitFieldsModel } from './git-fields';

@Injectable({
  providedIn: 'root'
})
export class JhipsterGeneratorService {

private apiBaseUrl = this.backendApiService.apiBaseUrl;
private JhipsterGeneratorUrl = `${this.apiBaseUrl}/jhipster-generator`;

/**
 * get all the languages options supported by JHipster - copied from the generator.
 */
getAllSupportedLanguageOptions() {
  return [
      { name: 'Arabic (Libya)', value: 'ar-ly' },
      { name: 'Armenian', value: 'hy' },
      { name: 'Bahasa Indonesia', value: 'id' },
      { name: 'Catalan', value: 'ca' },
      { name: 'Chinese (Simplified)', value: 'zh-cn' },
      { name: 'Chinese (Traditional)', value: 'zh-tw' },
      { name: 'Czech', value: 'cs' },
      { name: 'Danish', value: 'da' },
      { name: 'Dutch', value: 'nl' },
      { name: 'English', value: 'en' },
      { name: 'Estonian', value: 'et' },
      { name: 'French', value: 'fr' },
      { name: 'Galician', value: 'gl' },
      { name: 'German', value: 'de' },
      { name: 'Greek', value: 'el' },
      { name: 'Hindi', value: 'hi' },
      { name: 'Hungarian', value: 'hu' },
      { name: 'Italian', value: 'it' },
      { name: 'Japanese', value: 'ja' },
      { name: 'Korean', value: 'ko' },
      { name: 'Marathi', value: 'mr' },
      { name: 'Polish', value: 'pl' },
      { name: 'Portuguese (Brazilian)', value: 'pt-br' },
      { name: 'Portuguese', value: 'pt-pt' },
      { name: 'Romanian', value: 'ro' },
      { name: 'Russian', value: 'ru' },
      { name: 'Slovak', value: 'sk' },
      { name: 'Serbian', value: 'sr' },
      { name: 'Spanish', value: 'es' },
      { name: 'Swedish', value: 'sv' },
      { name: 'Turkish', value: 'tr' },
      { name: 'Tamil', value: 'ta' },
      { name: 'Thai', value: 'th' },
      { name: 'Ukrainian', value: 'ua' },
      { name: 'Vietnamese', value: 'vi' }
    ];
  }
  constructor(
    private backendApiService: BackendApiService,
    private http: HttpClient
  ) { }


  generateJhipsterApp(jhipsterConfiguration: JhipsterGeneratorModel, gitlabObject: GitFieldsModel) {
    const req = {'jhipsterConfiguration': jhipsterConfiguration, 'gitlabObject': gitlabObject};
    return this.http.post(`${this.JhipsterGeneratorUrl}/generate-app`, req)
      .pipe(map(
        res => {
          console.log('response in servie : {}', res);
          return res;
        }
      ));
  }
}
