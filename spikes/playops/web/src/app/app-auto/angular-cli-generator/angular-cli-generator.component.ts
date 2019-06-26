import { Component, OnInit } from '@angular/core';
import { AngularCliGeneratorService } from './angular-cli-generator.service';

@Component({
  selector: 'app-angular-cli-generator',
  templateUrl: './angular-cli-generator.component.html',
  styleUrls: ['./angular-cli-generator.component.css']
})
export class AngularCliGeneratorComponent implements OnInit {

  angularCliResponse: any = {
    'SkipInstall': '',
    'angularProgress': '',
    'responseMessage': '',
    'AppName': '',
    'directory': '',
    'commitBranch': '',
    'commit': '',
    'commitSummary': '',
    'pushMessage': '',
    'isPushToGitHub': ''
  };
  appFields: any = {
    appName: '',
    appPrefix: '',
    directoryName: '',
    pwa: 'false',
    inlineStyle: 'false',
    inlineTemplate: 'false',
    routingModule: 'false',
    stylesheet: '',
    skipTest: 'false',
    skipInstall: 'false',
    isPushToGithub: 'false',
    nameOfUser: '',
    userEmail: '',
    gitUserName: '',
    gitPassword: '',
    repoDescription: ''
  };
  // req object for check method
  req: any = {
    name: '',
    another: '',
    skipInstall: ''
  };
  constructor(
    private anngularCliGeneratorService: AngularCliGeneratorService
  ) { }

  ngOnInit() {
//    this.appFields = {};
    this.appFields.skipInstall = true;
    this.appFields.isPushToGithub = false;
    this.appFields.stylesheet = 'css';
  }

  checkApi() {
    return this.anngularCliGeneratorService.checkAPI(this.req).subscribe(data => {
      this.angularCliResponse = data;
    });
  }

  generateAngularCli() {
    this.angularCliResponse = '';
    return this.anngularCliGeneratorService.generateAngularCli(this.appFields).subscribe(data => {
      this.angularCliResponse = data;
      return this.angularCliResponse;
    });
  }

}
