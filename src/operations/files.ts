import cbFunc from '../cb/cb';
import db from '../db/basic';

export class Files {
  private _req: any;
  private _res: any;
  constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }
  public getAllByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from file join user_file on (file.id=user_file.file) where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public getImagesByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from file join user_file on (file.id=user_file.file and file.type=\'image\') where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public getTextByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from file join user_file on (file.id=user_file.file and file.type=\'doc\') where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public getVideoByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from file join user_file on (file.id=user_file.file and file.type=\'video\') where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public getZipByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from file join user_file on (file.id=user_file.file and file.type=\'zip\') where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public getOtherByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from file join user_file on (file.id=user_file.file and file.type=\'other\') where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }

  public getUncheckedByUserId(req: any, res: any) {
    const userId = req.session.userid || 0;
    db('cloud').then((con) => {
      const sql =
        'select * from pending_file join user_file on (pending_file.id=user_file.file) where user_file.user=' +
        userId +
        ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          res.json(result);
          con.end();
        }),
      );
    });
  }
}
