import CartProduct from './CartProduct';

export default class Cart {
  id: string;

  products: CartProduct[];

  constructor({ products = [], id = '' }: { products?: CartProduct[]; id?: string; } = {}) {
    this.id = id;
    this.products = products;
  }
}
