import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MarvelListComponent } from 'src/app/shared/component/marvel-list/marvel-list.component';
import { RouterModule } from '@angular/router';
import { MarvelHeaderComponent } from './marvel-header/marvel-header.component';
import { ShowDetailsComponent } from './show-details/show-details.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MarvelHeaderComponent,
    MarvelListComponent,
    ShowDetailsComponent,
    CommonModule,
  ],
  declarations: [MarvelHeaderComponent, MarvelListComponent, ShowDetailsComponent],
  entryComponents:[MarvelHeaderComponent,MarvelListComponent, ShowDetailsComponent]
})
export class SharedComponentsModule {}
