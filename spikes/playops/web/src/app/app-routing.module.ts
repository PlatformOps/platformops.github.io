import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent} from './infra-auto/configuration/configuration.component';
import { ElasticsearchComponent} from './infra-auto/elasticsearch/elasticsearch.component';
import { DirectoryComponent } from './infra-auto/directory/directory.component';

const routes: Routes = [
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'elasticsearch', component: ElasticsearchComponent},
  { path: 'directory', component: DirectoryComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
