import { createAction, props } from '@ngrx/store';
import { IBook } from '~/app/@types';

export const loadCart = createAction('[Cart] Load Cart');

type ICart = IBook & { amount: number };
// Action tải danh sách sản phẩm thành công
export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: ICart[] }>()
);

export const updateCart = createAction(
  '[Cart] Update Book To Cart',
  props<{ id: string; amount: number }>()
);

export const addCart = createAction(
  '[Cart] Add Book To Cart',
  props<{ cart: ICart }>()
);
export const addPrdCart = createAction(
  '[Cart] Increment Book To Cart',
  props<{ id: string }>()
);
export const removePrdCart = createAction(
  '[Cart] decrement Book To Cart',
  props<{ id: string }>()
);

export const removeCart = createAction(
  '[Cart] Remove Book To Cart',
  props<{ id: string }>()
);
export const destroyCart = createAction('[Cart] Destroy Cart');
