import CartProduct from './CartProduct';

export default class Order {
  Id: String;

  Ordernumber: String;

  CartId: Number;

  Products: Array<CartProduct>;

  OrderPayment: Object;

  SendingCosts: Number;

  User: Object;

  Created: Date;

  Status: String;

  Key: String;

  constructor(id: string,
    ordernumber: string,
    cartId: Number,
    products: Array<CartProduct>,
    orderPayment: Object,
    sendingCosts: Number,
    user: Object,
    created: Date,
    status: string,
    key: string) {
    this.Id = id;
    this.Ordernumber = ordernumber;
    this.CartId = cartId;
    this.Products = products;
    this.OrderPayment = orderPayment;
    this.SendingCosts = sendingCosts;
    this.User = user;
    this.Created = created;
    this.Status = status;
    this.Key = key;
  }
}
