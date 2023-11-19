import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { IBook, ICart } from '~/app/@types';
import { Bookservice } from '~/app/services/book.service';
import { addCart } from '~/app/store/cart/cart.action';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
  product!: IBook;
  baseUrl: any;
  amount: number = 1;
  images: any;
  constructor(
    private route: ActivatedRoute,
    private bookService: Bookservice,
    private store: Store<any>,
    private toast: ToastrService
  ) {}
  books: IBook[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) this.getBookBySlug(slug);
    });
  }
  getBookBySlug(slug: string) {
    this.bookService.getBySlug(slug).subscribe(
      (response: any) => {
        this.product = response.data;
        this.getAllBooks(response.data.category_id);
        // this.images = response.data.images.map((image: any) => image.base_url);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllBooks(category_id: string) {
    this.bookService.getAll({ category_id }).subscribe(
      (response) => {
        this.books = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleAddCart() {
    if (this.product) {
      this.store.dispatch(
        addCart({ cart: { ...this.product, amount: this.amount } as ICart })
      );
      this.toast.success('Thêm sản phẩm vô giỏ hàng thành công');
    }
  }

  handleChangeAmount(mode: number) {
    if (mode === 1) {
      this.amount = this.amount + 1;
      if (this.amount >= this.product.quantity) {
        this.amount = this.product.quantity;
      }
    }

    if (mode === -1) {
      this.amount = this.amount - 1;
      if (this.amount === 0) {
        this.amount = 1;
      }
    }
  }
}
