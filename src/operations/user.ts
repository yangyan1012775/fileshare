import * as crypto from 'crypto';
import * as moment from 'moment';
import cbFunc from '../cb/cb';
import basic from '../db/basic';

export class User {
  private _req: any;
  private _res: any;
  constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }

  public async register(req: any, res: any) {
    const data = req.body;
    const con = await basic('cloud');
    const sql = 'SELECT * FROM user WHERE email = \'' + data.email + '\';';
    const results = await new Promise((resolve, reject) => {
      con.query(sql, (err: any, result: any) => {
        resolve(result);
      });
    });

    if (results.length === 0) {
      const hash = crypto.createHash('sha256');
      hash.update(data.password);
      const hashPwd = hash.digest('hex');
      const date = new Date();
      const dateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');

      const sql2 =
        'INSERT INTO user (username,email,password,' +
        'created_at) VALUES(\'' +
        data.email +
        '\',\'' +
        data.email +
        '\',\'' +
        data.password +
        '\',\'' +
        dateTime +
        '\');';
      const results2 = await new Promise((resolve, reject) => {
        con.query(sql2, (err: any, result: any) => {
          resolve(result);
        });
        con.end();
      });
      res.send('ok');
    }
  }
}
