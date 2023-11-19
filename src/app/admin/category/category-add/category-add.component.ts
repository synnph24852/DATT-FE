import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '~/app/services/category.service';
import { UploadFileService } from '~/app/services/upload.service';
import { getErrorValidator } from '~/utils';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
})
export class CategoryAddComponent {
  constructor(
    private categoryService: CategoryService,
    private uploadFileService: UploadFileService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  avatar?: any = '';

  formBook = this.fb.group({
    name: ['', [Validators.required]],
  });

  onHandleSubmit() {
    if (!this.formBook.valid) {
      const error: string = getErrorValidator(this.formBook);
      this.toast.error(error);
      return;
    }
    if (this.formBook.valid) {
      const bookData: any = this.formBook.value;
      this.categoryService
        .create({ ...bookData, avatar: this.avatar })
        .subscribe(
          (data) => {
            this.router.navigate(['/admin/categories']);
            this.toast.success(
              'Success',
              'Chỉnh sửa thông tin sách thành công'
            );
          },
          (error) => this.toast.error('Error', error.message)
        );
    }
  }

  async handleChange(e: any): Promise<any> {
    this.uploadFileService.uploadFile(e.target.files).subscribe(
      (response) => {
        this.avatar = response.urls[0];
      },
      (error) => console.log(error)
    );
  }
}
