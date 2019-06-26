import { Component, OnInit } from '@angular/core';
import { JhipsterGeneratorModel } from './jhipster-generator-model';
import { JhipsterGeneratorService } from './jhipster-generator.service';
import { GitFieldsModel } from './git-fields';
declare const Buffer;

@Component({
  selector: 'app-jhipster-generator',
  templateUrl: './jhipster-generator.component.html',
  styleUrls: ['./jhipster-generator.component.css']
})
export class JhipsterGeneratorComponent implements OnInit {

  jhipsterAppModel: JhipsterGeneratorModel;
  gitlabObject: GitFieldsModel;
  languageOptions: any;
  repositoryName: string;

  jhipsterResponse: any = {
      'responseCode': '',
      'jhipsterCommand': '',
      'jhipsterOutput': '',
      'responseMessage': '',
  };

  constructor(
    public jhipsterGeneratorService: JhipsterGeneratorService,
  ) {
    this.newGenerator();
  }

  ngOnInit() {
    this.gitlabObject = new GitFieldsModel(true, 'gitlab', '', '', '', '', '', '');
    this.languageOptions = this.jhipsterGeneratorService.getAllSupportedLanguageOptions();
  }

  generateJhipster() {
    this.checkjhipsterAppModelBeforeSubmit();
    const responseBox = document.getElementById('ResponseBox');
    responseBox.scrollIntoView(true);
    this.jhipsterGeneratorService.generateJhipsterApp(this.jhipsterAppModel, this.gitlabObject)
        .subscribe(object => {
            console.log('object in component : {}', object);
            this.jhipsterResponse = object;
    });
  }

  // Generate project with default values
  newGenerator() {
    this.jhipsterAppModel = new JhipsterGeneratorModel(
        'monolith',
        'jhipsterSampleApplication',
        'io.github.jhipster.application',
        'io/github/jhipster/application',
        8080,
        false,
        'jwt',
        '../uaa',
        'ehcache',
        true,
        false,
        'sql',
        'h2Disk',
        'mysql',
        false,
        false,
        false,
        'maven',
        false,
        'yarn',
        [],
        false,
        'en',
        ['en'],
        'angularX',
        'jhi'
    );
    this.repositoryName = 'jhipster-sample-application';
}

// Make sure all values are set based on user selected configurations
checkjhipsterAppModelBeforeSubmit() {
   // this.submitted = true;

    if (this.jhipsterAppModel.cacheProvider === 'no') {
        this.jhipsterAppModel.enableHibernateCache = false;
    }
    if (this.jhipsterAppModel.websocket) {
        this.jhipsterAppModel.websocket = 'spring-websocket';
    }
    if (this.jhipsterAppModel.searchEngine) {
        this.jhipsterAppModel.searchEngine = 'elasticsearch';
    }
    if (this.jhipsterAppModel.enableSwaggerCodegen) {
        this.jhipsterAppModel.enableSwaggerCodegen = 'true';
    }
    if (this.jhipsterAppModel.messageBroker) {
        this.jhipsterAppModel.messageBroker = 'kafka';
    }
    if (this.jhipsterAppModel.enableTranslation && this.jhipsterAppModel.languages.indexOf(this.jhipsterAppModel.nativeLanguage) === -1) {
        this.jhipsterAppModel.languages.push(this.jhipsterAppModel.nativeLanguage);
    }
    this.jhipsterAppModel.jhiPrefix = 'jhi';
}

// Changes properties based on Application Type selection
changeApplicationType() {
  // server port
  if (this.jhipsterAppModel.applicationType === 'microservice') {
      this.jhipsterAppModel.serverPort = 8081;
  } else if (this.jhipsterAppModel.applicationType === 'uaa') {
      this.jhipsterAppModel.serverPort = 9999;
  } else {
      this.jhipsterAppModel.serverPort = 8080;
  }
  // authentication
  if (this.jhipsterAppModel.applicationType !== 'microservice') {
      this.jhipsterAppModel.authenticationType = 'jwt';
  }
  // service discovery
  if (this.jhipsterAppModel.applicationType === 'gateway' || this.jhipsterAppModel.applicationType === 'microservice') {
      this.jhipsterAppModel.serviceDiscoveryType = 'eureka';
  }
  // database
  if (this.jhipsterAppModel.databaseType === 'no') {
      this.jhipsterAppModel.databaseType = 'sql';
      this.changeDatabaseType();
  }
  // cache
  if (this.jhipsterAppModel.applicationType === 'microservice') {
      this.jhipsterAppModel.cacheProvider = 'hazelcast';
      this.jhipsterAppModel.enableHibernateCache = true;
  }
}

changePackageName() {
  this.jhipsterAppModel.packageFolder = this.jhipsterAppModel.packageName.replace(/\./g, '/');
}

changeServiceDiscoveryType() {
  if (this.jhipsterAppModel.serviceDiscoveryType === 'eureka') {
      this.jhipsterAppModel.authenticationType = 'jwt';
  }
  if (this.jhipsterAppModel.serviceDiscoveryType === 'false') {
      this.jhipsterAppModel.serviceDiscoveryType = false;
  }
}

changeAuthenticationType() {
  this.jhipsterAppModel.databaseType = 'sql';
  this.jhipsterAppModel.clientFramework = 'angularX';
  this.changeDatabaseType();
}

changeDatabaseType() {
  if (this.jhipsterAppModel.databaseType === 'sql') {
      this.jhipsterAppModel.devDatabaseType = 'h2Disk';
      this.jhipsterAppModel.prodDatabaseType = 'mysql';
      this.jhipsterAppModel.cacheProvider = 'ehcache';
      this.jhipsterAppModel.enableHibernateCache = true;
  } else if (this.jhipsterAppModel.databaseType === 'mongodb') {
      this.jhipsterAppModel.devDatabaseType = 'mongodb';
      this.jhipsterAppModel.prodDatabaseType = 'mongodb';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
  } else if (this.jhipsterAppModel.databaseType === 'cassandra') {
      this.jhipsterAppModel.devDatabaseType = 'cassandra';
      this.jhipsterAppModel.prodDatabaseType = 'cassandra';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
      this.jhipsterAppModel.searchEngine = false;
  } else if (this.jhipsterAppModel.databaseType === 'couchbase') {
      this.jhipsterAppModel.devDatabaseType = 'couchbase';
      this.jhipsterAppModel.prodDatabaseType = 'couchbase';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
      this.jhipsterAppModel.searchEngine = false;
  } else if (this.jhipsterAppModel.databaseType === 'no') {
      this.jhipsterAppModel.devDatabaseType = 'no';
      this.jhipsterAppModel.prodDatabaseType = 'no';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
      this.jhipsterAppModel.searchEngine = false;
  }
}

changeProdDatabaseType() {
  if (this.jhipsterAppModel.devDatabaseType === this.jhipsterAppModel.prodDatabaseType) {
      return;
  }
  if (this.jhipsterAppModel.databaseType === 'sql') {
      this.jhipsterAppModel.devDatabaseType = 'h2Disk';
  } else if (this.jhipsterAppModel.prodDatabaseType === 'mongodb') {
      this.jhipsterAppModel.devDatabaseType = 'mongodb';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
  } else if (this.jhipsterAppModel.prodDatabaseType === 'cassandra') {
      this.jhipsterAppModel.devDatabaseType = 'cassandra';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
  } else if (this.jhipsterAppModel.prodDatabaseType === 'no') {
      this.jhipsterAppModel.devDatabaseType = 'no';
      this.jhipsterAppModel.cacheProvider = 'no';
      this.jhipsterAppModel.enableHibernateCache = false;
  }
}

}
