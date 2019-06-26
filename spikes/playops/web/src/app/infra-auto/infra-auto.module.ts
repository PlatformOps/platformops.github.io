import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';
import { HttpClientModule } from '@angular/common/http';
import { InfraAutoRoutingModule } from './infra-auto-routing.module';
import { InfraAutoComponent } from './infra-auto.component';
import { ConfigurationComponent} from './configuration/configuration.component';
import { FormsModule } from '@angular/forms';
import { DirectoryComponent } from './directory/directory.component';

@NgModule({
  imports: [
    CommonModule,
    InfraAutoRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [ConfigurationComponent, ElasticsearchComponent, InfraAutoComponent, DirectoryComponent]
})
export class InfraAutoModule { }
