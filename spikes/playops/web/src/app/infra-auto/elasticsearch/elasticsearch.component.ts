import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from './elasticsearch.service';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent implements OnInit {
  req: any;
  elasticResponse: any = {
    'version': '',
    'node':'',
    'dockerOutput':'',
    'status': ''
  };

  fields: any = {
    version: '',
    node: ''
  };


  constructor(
    private elasticsearchService: ElasticsearchService
  ) {
   }

  ngOnInit() {
    
    this.fields = {};
  }

  elasticsearch() {
    console.log(this.fields);
    this.elasticResponse = '';
    return this.elasticsearchService.elasticsearch(this.fields).subscribe(data => {
      this.elasticResponse = data;
      return this.elasticResponse;
    });
  }

}