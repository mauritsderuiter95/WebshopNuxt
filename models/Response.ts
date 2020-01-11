export default class Response<T> {
  taken : number;

  skipped : number;

  total : number;

  data: T[]

  constructor(taken = Number.MAX_VALUE, skipped = 0, total = Number.MAX_VALUE, data = []) {
    this.taken = taken;
    this.skipped = skipped;
    this.total = total;
    this.data = data;
  }
}
