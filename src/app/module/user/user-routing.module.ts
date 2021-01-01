import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { MylistComponent } from './component/mylist/mylist.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: "your",
        component: MylistComponent
      }
    ]
  }, {
    path:'my',component: MylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
