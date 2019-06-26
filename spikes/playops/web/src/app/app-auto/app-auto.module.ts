import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCliGeneratorComponent } from './angular-cli-generator/angular-cli-generator.component';
import { HttpClientModule } from '@angular/common/http';
import { AppAutoRoutingModule } from './app-auto-routing.module';
import { FormsModule } from '@angular/forms';
import { AppAutoComponent } from './app-auto.component';
import { JhipsterGeneratorComponent } from './jhipster-generator/jhipster-generator.component';

@NgModule({
  imports: [
    CommonModule,
    AppAutoRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [AngularCliGeneratorComponent, AppAutoComponent, JhipsterGeneratorComponent]
})
export class AppAutoModule { }
