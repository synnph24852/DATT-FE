import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IBook, ICategory } from '~/app/@types';
import { Bookservice } from '~/app/services/book.service';
import { CategoryService } from '~/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private bookService: Bookservice,
    private categoryService: CategoryService,
    private http: HttpClient
  ) {}

  books: IBook[] = [];
  topBooks: IBook[] = [];
  categories: ICategory[] = [];
  ngOnInit() {
    this.getTopBook();
    this.getAllCategory();
    this.getAllBooks();
  }

  getTopBook() {
    this.bookService.getAll({ sort: 'quantity_sold', limit: 5 }).subscribe(
      (response) => {
        this.topBooks = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllBooks() {
    this.bookService.getAll({}).subscribe(
      (response) => {
        this.books = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  vnpay() {
    this.http
      .post('http://localhost:8000/api/vnpay/create-url', {})
      .subscribe((res) => {
        console.log(res);
      });
  }
  getAllCategory() {
    this.categoryService.getAll().subscribe(
      (response) => {
        this.categories = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
