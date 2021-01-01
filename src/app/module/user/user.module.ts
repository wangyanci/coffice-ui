import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MylistComponent } from './component/mylist/mylist.component';


@NgModule({
  declarations: [UserComponent, MylistComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzButtonModule
  ]
})
export class UserModule { }
