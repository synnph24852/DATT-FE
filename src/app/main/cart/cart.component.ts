import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ICart } from '~/app/@types';
import { OrderService } from '~/app/services/order.service';
import {
  addPrdCart,
  removeCart,
  removePrdCart,
  updateCart,
} from '~/app/store/cart/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  constructor(
    private store: Store<any>,
    private router: Router,
    private toast: ToastrService
  ) {}

  cart: ICart[] = [];

  selectAll = false;
  selectedItems: ICart[] = [];

  ngOnInit() {
    this.store
      .select((state) => state.cart)
      .subscribe((data) => {
        this.cart = data.cart;
      });
  }
  selectAllItems() {
    if (this.selectAll) {
      this.selectedItems = [...this.cart];
    } else {
      this.selectedItems = [];
    }
  }

  toggleItemSelection(item: ICart) {
    if (this.isSelected(item)) {
      this.selectedItems = this.selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    } else {
      this.selectedItems = [...this.selectedItems, item];
    }
    this.updateSelectAll();
  }

  isSelected(item: ICart): boolean {
    return this.selectedItems.includes(item);
  }

  updateSelectAll() {
    this.selectAll = this.selectedItems.length === this.cart.length;
  }

  handleRemoveCart(id: string | undefined) {
    const isCofirm = confirm('Bạn muốn xóa à !!');
    if (id && isCofirm) {
      this.store.dispatch(removeCart({ id }));
      this.selectedItems = this.selectedItems.filter((item) => item._id !== id);
      this.toast.success('Xóa sản phẩm giỏ hàng thành công');
    }
  }

  handleTotalCart() {
    const total = this.selectedItems.reduce(
      (pre, current) => pre + current.amount * current.price!,
      0
    );
    return total;
  }

  handleUpdateCart(id: string, e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.store.dispatch(updateCart({ id, amount: +value }));
  }
  handleDecrementCart(id: string) {
    this.store.dispatch(removePrdCart({ id }));
  }
  handleIncrementCart(id: string) {
    this.store.dispatch(addPrdCart({ id }));
  }

  handlePayment() {
    Swal.fire({
      position: 'center',
      title: 'Cảnh báo',
      text: 'Bạn chắc chắn muốn mua đơn hàng này chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const books = this.selectedItems.map((book) => ({
          book_id: book._id,
          amount: book.amount,
        }));
        const infoOrder = {
          books,
          total_price: this.handleTotalCart() - 21000,
        };
        sessionStorage.setItem('order', JSON.stringify(infoOrder));
        this.router.navigate(['/checkout']);
      }
    });
  }
}
