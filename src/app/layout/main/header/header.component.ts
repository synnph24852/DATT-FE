import { Store } from '@ngrx/store';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { loadCart } from '~/app/store/cart/cart.action';
import { SearchService } from '~/app/services/search.service';
import { IBook, IUser } from '~/app/@types';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @ViewChild('header_search') menu: any;
  constructor(
    private store: Store<any>,
    private searchService: SearchService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.handleChangeSearch = _.debounce(this.handleChangeSearch, 300);
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menu.nativeElement.contains(e.target)) {
        this.isActiveSearch = false;
      }
    });
  }

  totalCart: number = 0;
  isActiveSearch: boolean = false;
  isActiveInfo: boolean = false;
  searchValue: string = '';
  isLoading: boolean = false;
  books!: IBook[];
  userLogin: any = null;

  ngOnInit() {
    this.store.dispatch(loadCart());

    this.store
      .select((state) => state.cart)
      .subscribe((data) => {
        this.totalCart = data.cart?.length || 0;
      });

    this.userLogin = JSON.parse(localStorage.getItem('auth')!) as IUser;
  }

  handleChangeSearch(e: any) {
    this.searchValue = e.target.value;
    this.isLoading = true;
    this.searchService.searchBook(this.searchValue).subscribe((res) => {
      this.books = res.data;
      this.isLoading = false;
    });
  }

  handleLogout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
