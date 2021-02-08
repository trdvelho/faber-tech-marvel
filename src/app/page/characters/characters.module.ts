import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CharactersPage } from './characters.page';
import { RouterModule } from '@angular/router';
import { MarvelListComponent } from 'src/app/shared/component/marvel-list/marvel-list.component';
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
        component: CharactersPage
      },
    ])
  ],
  declarations: [CharactersPage]
})
export class CharactersPageModule {}
