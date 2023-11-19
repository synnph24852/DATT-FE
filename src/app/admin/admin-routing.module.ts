import { AuthGuard } from './../guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AdminLayoutComponent } from '../layout/admin/admin-layout/admin-layout.component';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { UserComponent } from './user/user.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'books', component: BookComponent },
      { path: 'books/add', component: BookAddComponent },
      { path: 'books/edit/:id', component: BookEditComponent },
      { path: 'users', component: UserComponent },
      { path: 'discount-code', component: DiscountCodeComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'categories/add', component: CategoryAddComponent },
      { path: 'categories/edit/:id', component: CategoryEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
