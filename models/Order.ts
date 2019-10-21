import CartProduct from './CartProduct';
import User from './User';

export default class Order {
  id: string;

  ordernumber: string;

  cartId: string;

  products: Array<CartProduct>;

  ideal: boolean;

  orderPayment: object;

  sendingCosts: number;

  user: User;

  created: Date;

  status: string;

  key: string;

  constructor(id: string = '',
    ordernumber: string = '',
    cartId: string = '',
    products: Array<CartProduct> = [],
    ideal: boolean = false,
    orderPayment: object = {},
    sendingCosts: number = 0,
    user: User = new User(),
    created: Date = new Date(),
    status: string = '',
    key: string = '') {
    this.id = id;
    this.ordernumber = ordernumber;
    this.cartId = cartId;
    this.products = products;
    this.ideal = ideal;
    this.orderPayment = orderPayment;
    this.sendingCosts = sendingCosts;
    this.user = user;
    this.created = created;
    this.status = status;
    this.key = key;
  }
}
