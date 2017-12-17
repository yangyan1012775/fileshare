// 引用basic
// 引用cb
import cbFunc from '../cb/cb';
import basic from '../db/basic';

export class Admin {
  private _req: any;
  private _res: any;
  constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }

  public getUsers(req: any, res: any) {
    basic('cloud').then((con) => {
      const sql = 'select * from user';
      con.query(sql, cbFunc((result: any) => {
                // console.log(100);
        res.json(result);
        con.end();

      }));

    });

  }
}
