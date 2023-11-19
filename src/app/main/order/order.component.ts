import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { IOrder } from '~/app/@types';
import { OrderService } from '~/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  orders: any = [];
  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.orderService.getAll().subscribe(
      (response) => {
        this.orders = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleCancelOrder(id: string) {
    Swal.fire({
      position: 'center',
      title: 'Cảnh báo',
      text: 'Bạn chắc chắn muốn hủy đơn hàng chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.update({ id, status: 'cancel' }).subscribe(
          (response) => {
            this.getAllCategory();
            this.toastr.success('Bạn đã hủy đơn hàng thành công');
          },
          ({ error }) => {
            this.toastr.error(error.message);
          }
        );
      }
    });
  }
}
