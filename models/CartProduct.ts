export default class CartProduct {
  productId: string;

  productName: string;

  productPrice: number;

  count: number;

  photo: object;


  constructor(
    productId: string = '',
    productName: string = '',
    productPrice: number = 0,
    count: number = 0,
    photo: object = {},
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.count = count;
    this.photo = photo;
  }
}
