import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAutoComponent } from './app-auto.component';
import { AngularCliGeneratorComponent } from './angular-cli-generator/angular-cli-generator.component';
import { JhipsterGeneratorComponent } from './jhipster-generator/jhipster-generator.component';

const appAutoRoutes: Routes = [
  {
    path: 'app-auto',
    component: AppAutoComponent,
  },
  {
    path: 'app-auto/angular-cli-generator',
    component: AngularCliGeneratorComponent,
  },
  {
    path: 'app-auto/jhipster-generator',
    component: JhipsterGeneratorComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appAutoRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppAutoRoutingModule { }
