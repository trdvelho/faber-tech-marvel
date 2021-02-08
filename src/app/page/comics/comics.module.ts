import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ComicsPage } from './comics.page';

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
        component: ComicsPage
      },
    ])
  ],
  declarations: [ComicsPage]
})
export class ComicsPageModule {}
