import CartProduct from './CartProduct';
import User from './User';

interface IAmount {
  value : string;
  currency : string
}

interface IPayment {
  amount : IAmount;
}

const amount : IAmount = {
  value: '0',
  currency: 'eur',
};

const payment : IPayment = {
  amount,
};

export default class Order {
  id: string;

  ordernumber: Number;

  cartId: string;

  products: Array<CartProduct>;

  ideal: boolean;

  orderPayment: IPayment;

  sendingCosts: number;

  user: User;

  created: Date;

  status: string;

  key: string;

  constructor(id: string = '',
    ordernumber: Number = 0,
    cartId: string = '',
    products: Array<CartProduct> = [],
    ideal: boolean = false,
    orderPayment: IPayment = payment,
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
