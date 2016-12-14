import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { DecomposeComponent } from './decompose.component';
import {DecomposeRoutes} from './decompose.routes';

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forRoot(DecomposeRoutes)],
    declarations: [DecomposeComponent],
    exports: [DecomposeComponent]
})

export class DecomposeModule { }
