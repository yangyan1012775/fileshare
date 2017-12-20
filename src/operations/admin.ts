// 引用basic
// 引用cb
import * as crypto from 'crypto';
import cbFunc from '../cb/cb';
import basic from '../db/basic';
import query from '../db/query';

export class Admin {
  public static permitFile: (fileId: string) => Promise<boolean>;
  public static rejectFile: (fileId: string) => Promise<boolean>;
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

Admin.permitFile = async function permitFile(fileId: string): Promise<boolean> {
    const con = await basic('cloud');
    const sql = `select * from pending_file where id=${fileId}`;
    const result = await query(sql, con);
    const delSql = `delete from pending_file where id=${fileId}`;
    await query(delSql, con);
    console.log(result + '=================');
    const addSql = `insert into file(id,filename,type,size,downloads,hash) values(${
      result[0].id
    },'${result[0].filename}','${result[0].type}',${result[0].size},${0},'${
      result[0].hash
    }')`;
    await query(addSql, con);
};

Admin.rejectFile = async function permitFile(fileId: string): Promise<boolean> {
  try {
    const con = await basic('cloud');
    const sql = `select * from file where id=${fileId}`;
    const result = await query(sql, con);
    const delSql = `delete from file where id=${fileId}`;
    await query(delSql, con);
    const addSql = `insert into pending_file(id,filename,type,size,hash) values(${
      result[0].id
    },'${result[0].filename}','${result[0].type}',${result[0].size},'${
      result[0].hash
    }')`;
    await query(addSql, con);
  } catch (err) {
    return false;
  }
  return true;
};
