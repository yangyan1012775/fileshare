import * as Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import cbFunc from '../cb/cb';
import db from '../db/basic';
import query from '../db/query';
import queryFile from '../db/queryFile';

export class File {
  public static dir: string;
  public static setDir(dir: string) {
    File.dir = dir;
  }
  private filename: string;
  private hash: string;
  private readonly types = {
    doc: 'doc/docx/txt/xls/xlsx/ppt/pptx',
    image: 'jpg/png/gif/jpeg/svg/ico',
    video: 'avi/mpeg/divx/wmv/cda/mp3/mid/wave',
    zip: 'zip/rar',
  };
  constructor(filename: string, hash: string) {
    this.filename = filename;
    this.hash = hash;
  }

  public async insert(type: string, size: number) {
    const con = await db('cloud');
    const value =
      '(\'' +
      this.filename +
      '\', \'' +
      type +
      '\',\'' +
      size +
      '\',\'' +
      this.hash +
      '\')';
    const sql =
      'insert into pending_file(filename, type, size, hash) values ' +
      value +
      ';';
    await query(sql, con);
  }

  public async upload(file: object, req: any, res: any) {
    let type = '';

    // 根据文件名后缀获取文件格式
    for (const k in this.types) {
      if (this.types[k].includes(file.extension.toLowerCase())) {
        type = k;
        break;
      }
    }
    if (type === '') {
      type = 'other';
    }

    await this.insert(type, file.size);
    res.json('上传成功');
  }

  public download(res: any) {
    const fsexists = promisify(fs.exists);
    // ------------------等其他两组提交后再将file改成变量
    const currFile = path.resolve('file/', this.filename);
    fsexists(currFile).then((exist: any) => {
      if (exist) {
        const f = fs.createReadStream(currFile);
        res.writeHead(200, {
          'Content-Disposition':
            'attachment; filename=' + encodeURI(this.filename),
          'Content-Type': 'application/force-download',
        });
        f.pipe(res);
      } else {
        res.set('Content-type', 'text/html');
        res.send('file not exist!');
        res.end();
      }
    });
  }
}
