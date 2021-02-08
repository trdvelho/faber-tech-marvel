import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ComicPage } from './comic.page';

import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared/component/shared-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComicPage
      },
    ])
  ],
  declarations: [ComicPage]
})
export class ComicPageModule {}
