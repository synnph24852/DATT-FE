import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgxEditorModule } from 'ngx-editor';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart/cart.reducer';

@NgModule({
  declarations: [AppComponent, CategoryItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzButtonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot({ cart: cartReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
