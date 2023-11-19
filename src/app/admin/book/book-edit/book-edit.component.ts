import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Bookservice } from '~/app/services/book.service';
import { CategoryService } from '~/app/services/category.service';
import { UploadFileService } from '~/app/services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Validators } from 'ngx-editor';
import { IBook, ICategory } from '~/app/@types';
import { getErrorValidator } from '~/utils';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit {
  constructor(
    private bookService: Bookservice,
    private categoryService: CategoryService,
    private uploadFileService: UploadFileService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getBookById(id as string);
    });
  }

  editor: any;
  avatar?: any;
  categories: ICategory[] = [];
  idBook: string = '';

  ngOnInit(): void {
    this.editor = new Editor();
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(
      (response) => {
        this.categories = response.data;
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  getBookById(id: string) {
    this.bookService.getById(id).subscribe(
      (response) => {
        this.formBook.patchValue(response.data as any);
        this.avatar = response.data?.avatar;
        this.idBook = response.data?._id;
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  formBook = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    original_price: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
    description: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    author: ['', [Validators.required]],
  });

  onHandleSubmit() {
    if (!this.formBook.valid) {
      const error: string = getErrorValidator(this.formBook);
      this.toast.error(error);
      return;
    }
    if (this.formBook.valid) {
      const bookData: any = this.formBook.value;
      this.bookService
        .update({ id: this.idBook, ...bookData, avatar: this.avatar })
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
