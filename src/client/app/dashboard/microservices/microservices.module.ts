import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MicroservicesComponent } from './microservices.component';
import { DecomposeRoutes } from '../decompose/decompose.routes';

@NgModule({
    imports: [FormsModule,CommonModule,RouterModule.forRoot(DecomposeRoutes)],
    declarations: [MicroservicesComponent],
    exports: [MicroservicesComponent]
})

export class MicroservicesModule { }
