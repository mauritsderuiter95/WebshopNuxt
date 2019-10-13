export default class CartProduct {
  productId: string;

  productName: string;

  productPrice: Number;

  count: Number;

  photo: object;


  constructor(
    productId: string = '',
    productName: string = '',
    productPrice: Number = 0,
    count: Number = 0,
    photo: object = {},
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.count = count;
    this.photo = photo;
  }
}
