import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBook } from '~/app/@types';
import { Bookservice } from '~/app/services/book.service';
import { CategoryService } from '~/app/services/category.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent {
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toast: ToastrService
  ) {}

  books: IBook[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) this.getBookBySlug(slug);
    });
  }

  getBookBySlug(slug: string) {
    this.categoryService.getBySlug(slug).subscribe(
      (response: any) => {
        this.books = response.data.books;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
