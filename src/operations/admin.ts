// 引用basic
// 引用cb
import * as crypto from 'crypto';
import basic from '../db/basic';
import Query from '../db/query';

export class Admin {
  private _req: any;
  private _res: any;
  constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }

  public async getUsers(req: any, res: any) {
    const con = await basic('cloud');
    const result1 = await Query('SELECT COUNT(*) FROM user', con);
    const sum = result1[0]['COUNT(*)']; // 总数据数量
    const pages = Math.ceil(sum / 5);
    const nowPage = Number(req.query.page);
    const start = nowPage * 5;

    const result = await Query(
      'SELECT * FROM user LIMIT ' + start + ',' + 5,
      con,
    );
    con.end();
    res.json({ pages, Res: result });
  }

  public async deleUser(req: any, res: any) {
    const con = await basic('cloud');
    const sql = 'delete from user where id =' + req.body.id;
    await Query(sql, con);
    con.end();
    res.json('ok');
  }

  public async resetPwd(req: any, res: any) {
    const con = await basic('cloud');
    // 这里将000000转为hash
    const hash = crypto.createHash('sha256');
    hash.update('000000');
    const hashed = hash.digest('hex');
    const sql =
      'update user set password = \'' + hashed + '\' where id = ' + req.body.id;
    await Query(sql, con);
    con.end();
    res.json('ok');
  }
  public async searchUser(req: any, res: any) {
    const con = await basic('cloud');
    const sql = 'select * from user where username = \'' + req.params.name + '\'';
    const searchResult = await Query(sql, con);
    if (searchResult.length) {
      con.end();
      res.json(searchResult);
      return;
    }
    con.end();
    res.json('none');
  }
}
