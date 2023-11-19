import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { IBook } from '~/app/@types';
import { Bookservice } from '~/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: [],
})
export class BookComponent implements OnInit {
  isVisibleCreate: boolean = false;
  isVisibleUpdate: boolean = false;
  idBook: string = '';

  showModal(): void {
    this.isVisibleCreate = true;
  }
  handleOk(): void {
    this.isVisibleCreate = false;
  }

  handleCancel(): void {
    this.isVisibleCreate = false;
    this.isVisibleUpdate = false;
  }

  constructor(
    private bookService: Bookservice,
    private toastr: ToastrService
  ) {}
  books: IBook[] = [];
  ngOnInit() {
    this.getAllBook();
  }

  getAllBook() {
    this.bookService.getAll().subscribe(
      (response) => {
        this.books = response.data.map((book, index) => ({
          key: index,
          ...book,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteBookById(id: string) {
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
        this.bookService.delete(id).subscribe(
          (response) => {
            this.getAllBook();
            this.toastr.success('Xóa sản phẩm thành công');
          },
          ({ error }) => {
            this.toastr.error(error.message);
          }
        );
      }
    });
  }

  handleOpenUpdateBook(id: string) {
    this.isVisibleUpdate = true;
    this.idBook = id;
  }
}
