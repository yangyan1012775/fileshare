// 引用basic
// 引用cb
import * as crypto from 'crypto';
import basic from '../db/basic';
import query from '../db/query';

export class Hot {
  private _req: any;
  private _res: any;
  constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }

  public async getVideo(req: any, res: any) {
    const con = await basic('cloud');
    const sql =
      'select * from file where type = \'video\' order by downloads DESC';
    const result = await query(sql, con);
    for (let i = 0; i < result.length; i++) {
      const fileid = result[i].id;
      const sql2 = 'select user from user_file where file = \'' + fileid + '\'';
      const con2 = await basic('cloud');
      const result2 = await query(sql2, con2);
      const sql3 =
        'select username from user where id =\'' + result2[0].user + '\'';
      const con3 = await basic('cloud');
      const result3 = await query(sql3, con3);
      result[i].username = result3[0].username;
      if (i === result.length - 1) {
        res.json(result);
      }
    }
  }
}
