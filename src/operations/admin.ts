// 引用basic
// 引用cb
import * as crypto from 'crypto';
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
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public deleUser(req: any, res: any) {
    basic('cloud').then((con) => {
      const sql = 'delete from user where id =?';
      const data = [req.body.id];
      con.query(
        sql,
        data,
        cbFunc((result: any) => {
          res.json('ok');
          con.end();
        }),
      );
    });
  }

  public resetPwd(req: any, res: any) {
    basic('cloud').then((con) => {
      // 这里将000000转为hash
      const hash = crypto.createHash('sha256');
      hash.update('000000');
      const hashed = hash.digest('hex');

      const sql = 'update user set password = ? where id = ?';
      const data = [hashed, req.body.id];
      con.query(
        sql,
        data,
        cbFunc((result: any) => {
          res.json('ok');
          con.end();
        }),
      );
    });
  }

  public searchUser(req: any, res: any) {
    basic('cloud').then((con) => {
      const sql = 'select * from user where username = ?';
      con.query(
        sql,
        req.params.name,
        cbFunc((result: any) => {
          if (result.length) {
            res.json(result);
            con.end();
            return;
          }
          res.json('none');
          con.end();
        }),
      );
    });
  }
}
