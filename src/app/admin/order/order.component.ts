import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { IOrder } from '~/app/@types';
import { OrderService } from '~/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
    `
      nz-select {
        width: 300px;
      }
    `,
  ],
})
export class OrderComponent {
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  orders: IOrder[] = [];
  isVisible = false;
  orderIdUpdate: string = '';
  statusOrder: string = '';

  showModal(id: string): void {
    this.isVisible = true;
    this.orderIdUpdate = id;
    this.orderService.getById(id).subscribe((res) => {
      this.statusOrder = res.data.status;
    });
  }

  handleOk(): void {
    Swal.fire({
      position: 'center',
      title: 'Cảnh báo',
      text: 'Bạn xác nhận cập nhật trạng thái đơn hàng chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService
          .update({ id: this.orderIdUpdate, status: this.statusOrder })
          .subscribe(
            (response) => {
              this.getAllCategory();
              this.toastr.success('Cập nhập trạng thái đơn hàng thành công');
              this.isVisible = false;
            },
            ({ error }) => {
              this.toastr.error(error.message);
            }
          );
      }
    });
    // this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.orderIdUpdate = '';
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.orderService.getAll().subscribe(
      (response) => {
        this.orders = response.data.map((book, index) => ({
          key: index,
          ...book,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
