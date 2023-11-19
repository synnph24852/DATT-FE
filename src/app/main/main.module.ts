import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from '../layout/main/header/header.component';
import { FooterComponent } from '../layout/main/footer/footer.component';
import { MainLayoutComponent } from '../layout/main/main-layout/main-layout.component';
import { BookItemComponent } from '../components/book-item/book-item.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { BooksComponent } from './books/books.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BookItemComponent,
    FooterComponent,
    MainLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BookDetailComponent,
    CartComponent,
    BooksComponent,
    PaymentComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzCarouselModule,
  ],
})
export class MainModule {}
