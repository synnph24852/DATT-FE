import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { CategoryService } from '~/app/services/category.service';
import { UploadFileService } from '~/app/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from 'ngx-editor';
import { getErrorValidator } from '~/utils';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent {
  constructor(
    private categoryService: CategoryService,
    private uploadFileService: UploadFileService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.categoryService.getById(id as string).subscribe((response) => {
        this.formBook.patchValue(response.data as any);
        this.avatar = response.data.avatar;
        this.idCategory = response.data?._id;
      });
    });
  }

  avatar?: any = '';
  idCategory: string = '';

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
        .update({ id: this.idCategory, ...bookData, avatar: this.avatar })
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
