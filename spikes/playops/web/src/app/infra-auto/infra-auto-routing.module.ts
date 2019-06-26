import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfraAutoComponent } from './infra-auto.component';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';

const infraAutoRoutes: Routes = [
  {
    path: 'app-auto',
    component: InfraAutoComponent,
  },
  {
    path: 'infra-auto/elasticsearch',
    component: ElasticsearchComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(infraAutoRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class InfraAutoRoutingModule { }
