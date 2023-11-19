import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ICategory } from '~/app/@types';
import { CategoryService } from '~/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}
  categories: ICategory[] = [];
  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(
      (response) => {
        this.categories = response.data.map((book, index) => ({
          key: index,
          ...book,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCategoryById(id: string) {
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
        this.categoryService.delete(id).subscribe(
          (response) => {
            this.getAllCategory();
            this.toastr.success('Xóa loại sách thành công');
          },
          ({ error }) => {
            this.toastr.error(error.message);
          }
        );
      }
    });
  }
}
