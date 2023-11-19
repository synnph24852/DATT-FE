import { Component, Input } from '@angular/core';
import { IBook } from '~/app/@types';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
})
export class BookItemComponent {
  @Input() book!: IBook;

  calculateDiscount(price: number, original_price: number): number {
    return Math.round(100 - (price * 100) / original_price);
  }
}
