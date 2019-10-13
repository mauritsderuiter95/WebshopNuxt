export default class JsonPatch {
  op: string;

  path: string;

  value: any;

  constructor(op : string, path : string, value : any) {
    this.op = op;
    this.path = path;
    this.value = value;
  }
}
