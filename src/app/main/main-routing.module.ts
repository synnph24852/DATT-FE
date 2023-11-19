import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from '../layout/main/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { BooksComponent } from './books/books.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { isLoginGuard } from '../guard/is-login.guard';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'books/:slug',
        component: BookDetailComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'category/:slug',
        component: BooksComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'checkout',
        component: PaymentComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
