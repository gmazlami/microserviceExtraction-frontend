import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { GraphComponent} from './graph.component';
import { GraphRoutes } from './graph.routes';

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forRoot(GraphRoutes)],
    declarations: [GraphComponent],
    exports: [GraphComponent]
})

export class GraphModule { }
