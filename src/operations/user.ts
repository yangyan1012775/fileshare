import { fail } from 'assert';
import * as crypto from 'crypto';
import * as moment from 'moment';
import cbFunc from '../cb/cb';
import basic from '../db/basic';

export class User {
  public async register(data) {
    const existed = await this.checkUser(data.email);
    if (existed) {
      return false;
    }
    return await this.insert(data);
  }

  protected createPassword(password: string) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

  protected async checkUser(email) {
    const con = await basic('cloud');
    const sql = 'SELECT * FROM user WHERE email = \'' + email + '\';';
    const results = await new Promise((resolve, reject) => {
      con.query(
        sql,
        cbFunc((res: any) => {
          resolve(res);
        }),
      );
    });
    if (results.length === 0) {
      return false;
    }
    return true;
  }
  protected async insert(data) {
    const con = await basic('cloud');
    const date = new Date();
    const password = this.createPassword(data.password);
    const dateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const insertQuery =
      'INSERT INTO user (username,email,password,' +
      'created_at) VALUES(\'' +
      data.email +
      '\',\'' +
      data.email +
      '\',\'' +
      password +
      '\',\'' +
      dateTime +
      '\');';
    const result = await new Promise((resolve, reject) => {
      con.query(
        insertQuery,
        cbFunc((res: any) => {
          resolve(res);
        }),
      );
    });
    return result.insertId;
  }
}
