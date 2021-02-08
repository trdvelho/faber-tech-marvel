import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  { path: 'characters',  loadChildren: () => import('./page/characters/characters.module').then( m => m.CharactersPageModule)},
  { path: 'character/:id', loadChildren: () => import('./page/character/character.module').then( m => m.CharacterPageModule)},
  { path: 'comics-character-in/:id', loadChildren: () => import('./page/comics/Comics.module').then( m => m.ComicsPageModule)},
  { path: 'comic/:id', loadChildren: () => import('./page/comic/Comic.module').then( m => m.ComicPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
