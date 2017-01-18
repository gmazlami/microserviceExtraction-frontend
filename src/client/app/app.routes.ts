import { Routes } from '@angular/router';

import { CloneComponent } from './dashboard/clone/index';

import { HomeRoutes } from './dashboard/home/index';
import { BlankPageRoutes } from './dashboard/blank-page/index';
import { CloneRoutes } from './dashboard/clone/index';
import { DecomposeRoutes } from './dashboard/decompose/index';
import { GraphRoutes } from './dashboard/graph/index';
import { MicroservicesRoutes } from './dashboard/microservices/index';


export const routes: Routes = [
	...HomeRoutes,
	...BlankPageRoutes,
	...CloneRoutes,
  ...DecomposeRoutes,
  ...GraphRoutes,
  ...MicroservicesRoutes,
	{ path: '**', component: CloneComponent },
];
