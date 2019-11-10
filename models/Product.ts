export default class Product {
  id: string;

  productName: string;

  price: number;

  category: string[];

  discount: Number;

  shortDescription: string;

  longDescription: string;

  photo: object;

  constructor(id: string = '',
    productName: string = '',
    price: number = 0,
    category: string[] = [],
    discount: Number = 0,
    shortDescription: string = '',
    longDescription: string = '',
    photo: object = {}) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.category = category;
    this.discount = discount;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.photo = photo;
  }
}
