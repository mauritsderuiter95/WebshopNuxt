export default class Product {
  id: string;

  productName: string;

  price: Number;

  category: string[];

  discount: Number;

  shortDescription: string;

  longDescription: string;

  photo: object;

  constructor(id: string,
    productName: string,
    price: Number,
    category: string[],
    discount: Number,
    shortDescription: string,
    longDescription: string,
    photo: object) {
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
