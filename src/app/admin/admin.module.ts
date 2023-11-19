import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxEditorModule } from 'ngx-editor';
import { AdminLayoutComponent } from '../layout/admin/admin-layout/admin-layout.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { UserComponent } from './user/user.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { OrderComponent } from './order/order.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    BookComponent,
    CategoryComponent,
    DiscountCodeComponent,
    UserComponent,
    BookEditComponent,
    BookAddComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzModalModule,
    NzUploadModule,
    NzSelectModule,
    NgxEditorModule.forRoot(),
  ],
})
export class AdminModule {}
