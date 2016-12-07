import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CloneComponent } from './clone.component';

@NgModule({
    imports: [FormsModule,CommonModule],
    declarations: [CloneComponent],
    exports: [CloneComponent]
})

export class CloneModule { }
