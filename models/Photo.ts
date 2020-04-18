export default class Photo {
  id: string;

  url: string;

  alt: string;

  title: string;

  constructor(
    id: string = '',
    url: string = '',
    alt: string = '',
    title: string = '',
  ) {
    this.id = id;
    this.url = url;
    this.alt = alt;
    this.title = title;
  }
}
