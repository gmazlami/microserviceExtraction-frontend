import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { SharedModule } from './shared/shared.module';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HomeModule } from './dashboard/home/home.module';
import { BlankPageModule } from './dashboard/blank-page/blankPage.module';
import { CloneModule } from './dashboard/clone/clone.module';
import { DecomposeModule } from './dashboard/decompose/decompose.module';

import {SidebarComponent} from './shared/index';
import {GraphModule} from "./dashboard/graph/graph.module";

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		SharedModule.forRoot(),
		RouterModule,
		DropdownModule,
		ModalModule,
		HomeModule,
		BlankPageModule,
		CloneModule,
    DecomposeModule,
    GraphModule
	],
	declarations: [AppComponent, SidebarComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>'
	}],
	bootstrap: [AppComponent]

})

export class AppModule { }
