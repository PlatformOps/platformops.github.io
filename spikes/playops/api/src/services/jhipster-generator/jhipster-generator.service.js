/**
 * Jhipster-generator Service
 *
 */

const shelljs = require('shelljs');

const jhipsterGeneratorService = {
    createYoRcforUAA(jhipsterJsonOptions,jhipsterBaseName) {  
        console.log('createYoRc for UAA method was called');
        let yoRcJson = {
          "generator-jhipster": jhipsterJsonOptions
        };
        shelljs.touch('.yo-rc.json');
        shelljs.echo(JSON.stringify(yoRcJson))
          .to('.yo-rc.json');
      },      
    createYoRcforMonolith( jhipsterJsonOptions,jhipsterBaseName) {
        console.log('createYoRc for Monolith method was called');
        let yoRcJson = {
          "generator-jhipster": jhipsterJsonOptions
        };
        shelljs.touch('.yo-rc.json');
        shelljs.echo(JSON.stringify(yoRcJson))
          .to('.yo-rc.json');
      },      
    createYoRcforGateway( jhipsterJsonOptions,jhipsterBaseName) {
        console.log('createYoRc for Gateway method was called');
        let yoRcJson = {
          "generator-jhipster": jhipsterJsonOptions
        };
        shelljs.touch('.yo-rc.json');
        shelljs.echo(JSON.stringify(yoRcJson))
          .to('.yo-rc.json');
      },
    createYoRcforMicroservice( jhipsterJsonOptions,jhipsterBaseName) {
        console.log('createYoRc for Microservice method was called');  
        let yoRcJson = {
          "generator-jhipster": jhipsterJsonOptions
        };
        shelljs.touch('.yo-rc.json');
        shelljs.echo(JSON.stringify(yoRcJson))
          .to('.yo-rc.json');
      }
 };

module.exports = jhipsterGeneratorService;
