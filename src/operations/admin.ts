// 引用basic
// 引用cb
import * as crypto from 'crypto';
import basic from '../db/basic';
import Query from '../db/query';

export class Admin {
  public static permitFile: (fileId: string) => Promise<boolean>;
  public static rejectFile: (fileId: string) => Promise<boolean>;
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

Admin.permitFile = async function permitFile(fileId: string): Promise<boolean> {
    const con = await basic('cloud');
    const sql = `select * from pending_file where id=${fileId}`;
    const result = await Query(sql, con);
    const delSql = `delete from pending_file where id=${fileId}`;
    await Query(delSql, con);
    console.log(result + '=================');
    const addSql = `insert into file(id,filename,type,size,downloads,hash) values(${
      result[0].id
    },'${result[0].filename}','${result[0].type}',${result[0].size},${0},'${
      result[0].hash
    }')`;
    await Query(addSql, con);
};

Admin.rejectFile = async function permitFile(fileId: string): Promise<boolean> {
  try {
    const con = await basic('cloud');
    const sql = `select * from file where id=${fileId}`;
    const result = await Query(sql, con);
    const delSql = `delete from file where id=${fileId}`;
    await Query(delSql, con);
    const addSql = `insert into pending_file(id,filename,type,size,hash) values(${
      result[0].id
    },'${result[0].filename}','${result[0].type}',${result[0].size},'${
      result[0].hash
    }')`;
    await Query(addSql, con);
  } catch (err) {
    return false;
  }
  return true;
};
