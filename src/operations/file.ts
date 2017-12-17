import db from '../db/basic';

export class Files {
  private filename:string;
  private hash:string;
  constructor(filename:string,hash:string) {
    this.filename = filename;
    this.hash = hash;
  }
  public upload(file: object, req: any, res: any) {
    res.json('上传成功');
  }
}
