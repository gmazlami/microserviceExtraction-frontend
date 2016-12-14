import { Route } from '@angular/router';

import { DecomposeComponent } from './index';

export const DecomposeRoutes: Route[] = [
	{
		path: 'decompose/:id',
		component: DecomposeComponent
	},
  {
    path: 'decompose',
    component: DecomposeComponent
  }
];
