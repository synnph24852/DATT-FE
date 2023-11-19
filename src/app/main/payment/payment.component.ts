import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IUser } from '~/app/@types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getErrorValidator } from '~/utils';
import Swal from 'sweetalert2';
import { OrderService } from '~/app/services/order.service';
import { Store } from '@ngrx/store';
import { destroyCart } from '~/app/store/cart/cart.action';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private orderService: OrderService,
    private store: Store<any>
  ) {}
  user: IUser | null = null;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('auth')!);

    this.formCheck.patchValue(this.user as any);
  }

  formCheck = this.fb.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  onHandleSubmit() {
    if (!this.formCheck.valid) {
      const error: string = getErrorValidator(this.formCheck);
      this.toast.error(error);
      return;
    }
    Swal.fire({
      position: 'center',
      title: 'Cảnh báo',
      text: 'Bạn chắc chắn thông tin chính xác chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const cart = JSON.parse(sessionStorage.getItem('order')!);

        const _infoOrder = {
          ...cart,
          user_id: this.user?._id,
          address: this.formCheck.value.address,
        };

        this.orderService.create(_infoOrder).subscribe(
          (response) => {
            this.toast.success('Đặt hàng thành công');
            this.store.dispatch(destroyCart());
            this.router.navigate(['/orders']);
          },
          (error: any) => {
            this.toast.error(
              'Đã a có lỗi xảy ra, vui lòng thử lại sau',
              error?.error.message
            );
          }
        );
      }
    });
  }
}
