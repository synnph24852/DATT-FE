import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { IBook, ICategory } from '~/app/@types';
import { Bookservice } from '~/app/services/book.service';
import { CategoryService } from '~/app/services/category.service';
import { UploadFileService } from '../../../services/upload.service';
import { getErrorValidator } from '~/utils';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styles: [
    `
      :host ::ng-deep .avatar-uploader > .ant-upload {
        width: 140px;
        height: 140px;
      }
    `,
  ],
})
export class BookAddComponent implements OnInit {
  constructor(
    private bookService: Bookservice,
    private categoryService: CategoryService,
    private uploadFileService: UploadFileService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  editor: any;
  avatar?: string = '';
  images?: string[] = [];
  categories: ICategory[] = [];

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

  formBook = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    original_price: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
    description: ['', [Validators.required]],
    category_id: ['1', [Validators.required]],
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
        .create({ ...bookData, avatar: this.avatar, images: this.images })
        .subscribe(
          (data) => {
            this.router.navigate(['/admin/books']);
            this.toast.success(
              'Success',
              'Thêm thông tin sách thành công'
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

  async handleUploadMultipleImage(e: any) {
    this.uploadFileService.uploadFile(e.target.files).subscribe(
      (response) => {
        this.images = response.urls;
      },
      (error) => console.log(error)
    );
  }
}
