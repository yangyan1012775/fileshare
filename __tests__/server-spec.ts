import { Server } from '../src/server';
import { File } from '../src/operations/file';
import * as Express from 'express';
import * as request from 'supertest';
import * as mysql from 'mysql';
import * as path from 'path';
import cbFunc from '../src/cb/cb';
import * as assert from 'assert';

const app = Express();
const server = new Server(app, 3000);

test('Should greet with message', () => {
  const express1 = Express();
  const express2 = Express();
  expect(express1 !== express2).toBe(true);
  const server = new Server(express1);
  expect(server.server).toBe(express1);
  server.server = express2;
  expect(server.server).toBe(express2);
});

test('setDir', () => {
  const dir = path.resolve(__dirname, './file');
  File.setDir(dir);
  expect(dir).toBe(File.dir);
});

test('首页url测试', done => {
  request(app)
    .get('/')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('index')).toBeTruthy();
      done();
    });
});

test('热门文件url测试', done => {
  request(app)
    .get('/hots/video')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('video')).toBeTruthy();
      done();
    });
});
test('热门音频url测试', done => {
  request(app)
    .get('/hots/zip')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('video')).toBeTruthy();
      done();
    });
});
test('热门图片url测试', done => {
  request(app)
    .get('/hots/image')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('video')).toBeTruthy();
      done();
    });
});
test('热门文章url测试', done => {
  request(app)
    .get('/hots/doc')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('video')).toBeTruthy();
      done();
    });
});

test('测试访问用户页面success', done => {
  request(app)
    .get('/user/5555')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('-用户文件管理')).toBeTruthy();
      done();
    });
});
test('测试访问用户页面fail', done => {
  request(app)
    .get('/user/qqq')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('404')).toBeTruthy();
      done();
    });
});
/* 管理员 url */
test('测试管理员登录success', done => {
  request(app)
    .get('/admin/login')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('-管理员登录')).toBeTruthy();
      done();
    });
});
test('测试管理员 password modify', done => {
  request(app)
    .get('/admin/update')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('管理员个人设置')).toBeTruthy();
      done();
    });
});
test('测试管理员 logout', done => {
  request(app)
    .get('/admin/logout')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('-管理员登录')).toBeTruthy();
      done();
    });
});
/* 管理员 api */
test('测试管理员 login', done => {
  request(app)
    .post('/api/admins')
    .type('form')
    .send({ action: 'login' })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body === 'ok').toBeTruthy();
      done();
    });
});
test('url-register', done => {
  request(app)
    .get('/user/register')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('注册')).toBeTruthy();
      done();
    });
});
test('url-info', done => {
  request(app)
    .get('/user/info')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('用户注册页面')).toBeTruthy();
      done();
    });
});
test('url-login', done => {
  request(app)
    .get('/user/login')
    .expect(200, function(err, res) {
      console.log(err);
      expect(err).toBeFalsy();
      expect(res.text.includes('登录')).toBeTruthy();
      done();
    });
});

test('测试访问用户管理页面', done => {
  request(app)
    .get('/admin/users')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('支持模糊搜索')).toBeTruthy();
      done();
    });
});

test('测试访问文件分类页面', done => {
  request(app)
    .get('/admin/file/category')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('-后台内容')).toBeTruthy();
      done();
    });
});

test('测试数据库链接', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  // 创建user数据
  con.query(
    "INSERT INTO user(username, password, email, created_at) VALUES ('user1','123','user1.qq','2017-10-20')",
    function(err) {
      expect(err).toBeFalsy();
      console.log('insert success');
      con.end();
      done();
    }
  );
});

test('visit error urls', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'aaa',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('error')).toBeTruthy();
      console.log(res.text);
      done();
    });
});

test('api-register', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'register',
      email: '111@163.com',
      password: 'qqq111qqq',
      confirm: 'qqq111qqq',
    })
    .expect(200, function(err, res) {
      console.log(res.text);
      expect(err).toBeFalsy();
      expect(res.text.includes('ok')).toBeTruthy();
      console.log(res.text);
      done();
    });
});

test('api-register', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'register',
      email: '111@163.com',
      password: 'qqq111qqq',
      confirm: 'qqq111qqq',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('false')).toBeTruthy();
      console.log(res.text);
      done();
    });
});

test('api-login', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'login',
      email: '111@163.com',
      password: 'qqq111qqq',
    })
    .expect(200, function(err, res) {
      console.log(res.body);
      expect(err).toBeFalsy();
      expect(res.body.email.includes('111@163.com')).toBeTruthy();
      console.log(res.body);
      done();
    });
});

test('api-login 密码不存在', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'login',
      email: '111@163.com',
      password: '1111111111a',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('false')).toBeTruthy();
      console.log(res.text);
      done();
    });
});
test('api-login 用户名不存在', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'login',
      password: 'kkkkkkkkkkkkk2',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('false')).toBeTruthy();
      console.log(res.text);
      done();
    });
});

test('default', done => {
  request(app)
    .post('/api/users')
    .type('form')
    .send({
      action: 'sss',
      email: '111@163.com',
      password: 'qqq111qqq',
      confirm: 'qqq111qqq',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text.includes('error')).toBeTruthy();
      console.log(res.text);
      done();
    });
});

test('测试用户分页获取', done => {
  request(app)
    .get('/api/admins/users?page=0')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body.pages === 1).toBeTruthy();
      done();
    });
});

test('测试单用户查询', done => {
  request(app)
    .get('/api/admins/users/user1')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body[0].id === 1).toBeTruthy();
      done();
    });
});

test('测试单用户查询结果无此用户', done => {
  request(app)
    .get('/api/admins/users/user15')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body === 'none').toBeTruthy();
      done();
    });
});

test('测试用户密码重置', done => {
  request(app)
    .post('/api/admins/users')
    .type('form')
    .send({ action: 'reset', id: 1 })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body === 'ok').toBeTruthy();
      done();
    });
});

test('测试用户删除', done => {
  request(app)
    .post('/api/admins/users')
    .type('form')
    .send({ action: 'delete', id: 1 })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body === 'ok').toBeTruthy();
      done();
    });
});

test('cb错误测试覆盖', done => {
  let func = cbFunc(() => {});
  let entered = false;
  try {
    func(new Error('222'), '0');
  } catch (e) {
    expect(e.message === '222').toBeTruthy();
    entered = true;
  }
  expect(entered).toBeTruthy();
  done();
});

test('测试.txt文件上传成功', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .field('action', 'upload')
    .attach('_upload', '__tests__/fixtures/1.txt')
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.body === '上传成功').toBeTruthy();
      done();
    });
});

test('测试.jpg文件上传成功', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .field('action', 'upload')
    .attach('_upload', '__tests__/fixtures/1.jpg')
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.body === '上传成功').toBeTruthy();
      done();
    });
});
test('测试.avi文件上传成功', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .field('action', 'upload')
    .attach('_upload', '__tests__/fixtures/1.avi')
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.body === '上传成功').toBeTruthy();
      done();
    });
});
test('测试.zip文件上传成功', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .field('action', 'upload')
    .attach('_upload', '__tests__/fixtures/1.zip')
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.body === '上传成功').toBeTruthy();
      done();
    });
});
test('测试.md文件上传成功', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .field('action', 'upload')
    .attach('_upload', '__tests__/fixtures/1.md')
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.body === '上传成功').toBeTruthy();
      done();
    });
});
test('测试.exe文件上传成功', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .field('action', 'upload')
    .attach('_upload', '__tests__/fixtures/1.exe')
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.body === '上传成功').toBeTruthy();
      done();
    });
});

test('获取未审核文件', done => {
  request(app)
    .get('/api/files?filter=pending')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      done();
    });
});

test('测试文件审核通过 id=1', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .send({
      action: 'permit',
      id: '1',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      done();
    });
});

test('测试文件审核通过 id=2', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .send({
      action: 'permit',
      id: '2',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      done();
    });
});

test('测试文件审核通过 id=3', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .send({
      action: 'permit',
      id: '3',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      done();
    });
});

test('测试文件审核通过 id=4', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .send({
      action: 'permit',
      id: '4',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      done();
    });
});
test('测试文件审核通过 id=5', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .send({
      action: 'permit',
      id: '5',
    })
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      done();
    });
});

test('测试文件审核未通过 id=6', done => {
  request(app)
    .post('/api/files')
    .type('form')
    .send({ action: 'reject', id: '6' })
    .expect(200, (err, res) => {
      expect(err).toBeFalsy();
      done();
    });
});

test('测试获取分类文件', done => {
  request(app)
    .get('/api/files?type=image')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      console.log(err);
      console.log(res.body);
      expect(res.body).toBeTruthy();
      done();
    });
});

test('测试download----', done => {
  request(app)
    .get('/user/download?id=1')
    .expect(200, function(err, res) {
      done();
    });
});

test('测试user-热门', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  var data = [
    ['user1', '123', 'user1.qq', '2017-10-20'],
    ['user2', '123', 'user1.qq', '2017-10-20'],
    ['user3', '123', 'user1.qq', '2017-10-20'],
    ['user4', '123', 'user1.qq', '2017-10-20'],
    ['user5', '123', 'user1.qq', '2017-10-20'],
    ['user6', '123', 'user1.qq', '2017-10-20'],
    ['user7', '123', 'user1.qq', '2017-10-20'],
    ['user8', '123', 'user1.qq', '2017-10-20'],
  ];
  con.query(
    'INSERT INTO user(username, password, email, created_at) VALUES ?',
    [data],
    function(err) {
      expect(err).toBeFalsy();
      console.log('insert success');
      con.end();
      done();
    }
  );
});
test('测试file-热门', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  var data = [
    ['t1', 'video', 3, 100, '111'],
    ['t2', 'video', 3, 100, '120'],
    ['t3', 'zip', 3, 90, '111'],
    ['t4', 'zip', 3, 110, '120'],
    ['t5', 'image', 3, 20, '111'],
    ['t6', 'image', 3, 50, '120'],
    ['t7', 'doc', 3, 70, '111'],
    ['t8', 'doc', 3, 122, '120'],
  ];
  con.query(
    'insert into `file` ( `filename`, `type`, `size`, `downloads`, `hash`) values ?',
    [data],
    function(err) {
      expect(err).toBeFalsy();
      console.log('insert success');
      con.end();
      done();
    }
  );
});
test('测试user_file-热门', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  var data = [
    [1, 1, '2017-12-07 00:00:00'],
    [2, 2, '2017-12-07 00:00:00'],
    [3, 3, '2017-12-07 00:00:00'],
    [4, 4, '2017-12-07 00:00:00'],
    [5, 5, '2017-12-07 00:00:00'],
    [6, 6, '2017-12-07 00:00:00'],
    [7, 7, '2017-12-07 00:00:00'],
    [8, 8, '2017-12-07 00:00:00'],
  ];
  con.query(
    'INSERT INTO `user_file` (`user`, `file`, `upload_at`) values ?',
    [data],
    function(err) {
      expect(err).toBeFalsy();
      console.log('insert success');
      con.end();
      done();
    }
  );
});
test('/hot/video读取测试', done => {
  request(app)
    .get('/api/files/hots?type=video')
    .expect(200, function(err, res) {
      console.log(err);
      console.log(res.text);
      expect(err).toBeFalsy();
      expect(res.body.length >= 1).toBeTruthy();
      done();
    });
});
test('/hot/zip读取测试', done => {
  request(app)
    .get('/api/files/hots?type=zip')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body.length >= 1).toBeTruthy();
      done();
    });
});
test('/hot/image读取测试', done => {
  request(app)
    .get('/api/files/hots?type=image')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body.length >= 1).toBeTruthy();
      done();
    });
});
test('/hot/doc读取测试', done => {
  request(app)
    .get('/api/files/hots?type=doc')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body.length >= 1).toBeTruthy();
      done();
    });
});

test('测试文件分类--allFiles', done => {
  request(app)
    .get('/api/users/1/allFiles')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
test('测试文件分类--image', done => {
  request(app)
    .get('/api/users/1/image')
    .expect(200, function(err, res) {
      // res.send();
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
test('测试文件分类--text', done => {
  request(app)
    .get('/api/users/1/text')
    .expect(200, function(err, res) {
      // res.send();
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
test('测试文件分类--video', done => {
  request(app)
    .get('/api/users/1/video')
    .expect(200, function(err, res) {
      // res.send();
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
test('测试文件分类--zip', done => {
  request(app)
    .get('/api/users/1/zip')
    .expect(200, function(err, res) {
      // res.send();
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
test('测试文件分类--other', done => {
  request(app)
    .get('/api/users/1/other')
    .expect(200, function(err, res) {
      // res.send();
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
test('测试文件分类--unchecked', done => {
  request(app)
    .get('/api/users/1/unchecked')
    .expect(200, function(err, res) {
      // res.send();
      expect(err).toBeFalsy();
      expect(res.text !== '').toBeTruthy();
      done();
    });
});
beforeAll(function(done) {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });
  con.query('DROP DATABASE IF EXISTS cloud;', function(err) {
    console.log('zheli');
    expect(err).toBeFalsy();
    console.log('删除数据库cloud');
    con.query('CREATE DATABASE cloud character set utf8;', function(err) {
      expect(err).toBeFalsy();
      console.log('创建数据库cloud');
      con.end();
      con = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: 'cloud',
      });
      con.query(
        'create table user (id int primary key auto_increment,username varchar(20)not null,password varchar(64)not null,email varchar(30)not null,created_at datetime not null)',
        function(err) {
          expect(err).toBeFalsy();
          console.log('success user');
          con.query(
            'create table pending_file (id int auto_increment,filename varchar(255) not null,type varchar(20) not null,size int not null,hash varchar(64) not null,primary key(id));',
            function(err) {
              expect(err).toBeFalsy();
              console.log('success pending_file');
              con.query(
                'create table user_file (id int auto_increment,file int not null,user int not null,upload_at datetime not null,primary key(id));',
                function(err) {
                  expect(err).toBeFalsy();
                  console.log('success user_file');
                  con.query(
                    'create table file (id int auto_increment,filename varchar(255) not null,type varchar(20) not null,size int not null,hash varchar(64) not null,downloads int not null,primary key(id));',
                    function(err) {
                      expect(err).toBeFalsy();
                      console.log('success file');
                      con.query(
                        'create table admin (id int primary key auto_increment,username varchar(20)not null,password varchar(64)not null,created_at datetime not null);',
                        function(err) {
                          expect(err).toBeFalsy();
                          console.log('success admin');
                          con.query(
                            'create table website_statistics (id int primary key auto_increment,registers int not null,downloads int not null,uploads int not null,visits int not null,date date not null);',
                            function(err) {
                              expect(err).toBeFalsy();
                              console.log('website_statistics');
                              //建立完成后断开
                              con.end();
                              done();
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});
