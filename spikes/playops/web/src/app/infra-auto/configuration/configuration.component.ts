import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  nginxConf = {
    upstream: null,
    blue_ip: null,
    blue_port: null,
    green_ip: null,
    green_port: null,
    server_name: null,
    addSSl: false,
    certificate: null,
    key: null,
    sslCertificate: null,
    sslKey: null
  };

  nginxConfiguration: any;

  constructor(private configuration: ConfigurationService) {

  }

  toggleCheck(){
    this.nginxConf.addSSl = !this.nginxConf.addSSl;
  }

  createNginx(){
    return this.configuration.checkAPI(this.nginxConf).subscribe(data => {
      this.nginxConfiguration = data;
    });
  }

  ngOnInit() {
  }

}
