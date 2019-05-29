import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent }         from "./add/add.component";
import { ManageComponent }      from "./manage/manage.component";

const routes: Routes = [
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'manage',
    component: ManageComponent
  },
  {
    path: '**',
    component: AddComponent
  }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
