import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { DataTableComponent } from '@shared/components/data-tables/data-table.component';
import { MaterialModule } from '@shared/material.module';


@NgModule({
  declarations: [
    DataTableComponent,
  ],
  imports: [CommonModule, , MaterialModule, RouterModule ],
  exports: [
    DataTableComponent,
    MaterialModule,
    RouterModule,
  ],
  entryComponents: []
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        /* All of our services go here */
      ]
    };
  }
}
