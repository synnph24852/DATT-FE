export interface IBook {
  _id: string;
  name: string;
  slug: string;
  price: number;
  author: string;
  original_price: number;
  description: string;
  avatar: {
    url: string;
    publicId: string;
  };
  images: string[];
  categoryId: string;
  quantity: number;
  quantity_sold: number;
}

export interface ICategory {
  _id: string;
  name: string;
  books: IBook[];
  slug: string;
  avatar: {
    url: string;
    publicId: string;
  };
  createdAt: string;
}

export type ICart = Omit<IBook, ''> & { amount: number };

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  avatar: {
    url: string;
    publicId: string;
  };
  password: string;
  role?: string;
  phone?:string
  address?:string
}

export interface IOrder {
  _id: string;
  status: string;
  total_price: number;
  books: {
    book: IBook;
    amount: number;
  };
  createdAt: string;
}
