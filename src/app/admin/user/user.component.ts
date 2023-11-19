import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { IUser } from '~/app/@types';
import { UserService } from '~/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  users: IUser[] = [];
  ngOnInit() {
    this.getAllBook();
  }

  getAllBook() {
    this.userService.getAll().subscribe(
      (response) => {
        this.users = response.data.map((book, index) => ({
          key: index,
          ...book,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUserById(id: string) {
    Swal.fire({
      position: 'center',
      title: 'Cảnh báo',
      text: 'Bạn chắc chắn muốn xóa chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(
          (response) => {
            this.getAllBook();
            this.toastr.success('Xóa nguời dùng thành công');
          },
          ({ error }) => {
            this.toastr.error(error.message);
          }
        );
      }
    });
  }
}
