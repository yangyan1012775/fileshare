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

test('测试数据库创建', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });

  con.query('CREATE DATABASE cloud character set utf8', function(err) {
    expect(err).toBeFalsy();
    // 断开
    con.end();
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
  // 创建user
  con.query(
    'create table user (id int primary key auto_increment,username varchar(20)not null,password varchar(64)not null,email varchar(30)not null,created_at datetime not null)',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success user');
      con.query(
        "INSERT INTO user(username, password, email, created_at) VALUES ('user1','123','user1.qq','2017-10-20')",
        function(err) {
          expect(err).toBeFalsy();
          console.log('insert success');
          con.end();
          done();
        }
      );
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

test('测试用户所有获取', done => {
  request(app)
    .get('/api/admins/users')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body[0].username === 'user1').toBeTruthy();
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

test('创建待审文件表', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  // 创建pending_file
  con.query(
    'create table pending_file (id int auto_increment,filename varchar(255) not null,type varchar(20)not null,size int not null,hash varchar(64) not null,primary key(id));',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success pending_file');
      con.end();
      done();
    }
  );
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

test('insert file', done => {
  let app = Express();
  let server = new Server(app, 3000);
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  // 创建file
  con.query(
    'create table file (id int primary key auto_increment,filename varchar(255)not null,type varchar(20)not null,size int(11)not null,downloads int(11) not null,hash varchar(64)not null)',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success user');
      con.query(
        "insert into file(filename, type, size, downloads,hash) values ('girl.JPG','image',40,2,'asgsagasgasdaasg');",
        function(err) {
          expect(err).toBeFalsy();
          console.log('insert success');
          con.end();
          done();
        }
      );
    }
  );
});

test('测试download----', done => {
  request(app)
    .get('/user/download?id=1')
    .expect(200, function(err, res) {
      done();
    });
});

test('测试download----fail', done => {
  let app = Express();
  let server = new Server(app, 3000);
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  con.query(
    "insert into file(filename, type, size, downloads,hash) values ('girlTest.JPG','image',40,2,'asgsagasgasdaasg');",
    function(err) {
      expect(err).toBeFalsy();
      console.log('insert success');
      con.end();
      done();
    }
  );
  request(app)
    .get('/user/download?id=2')
    .expect(200, function(err, res) {
      if (err) throw err;
      expect(res.text.includes('not')).toBeTruthy();
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
    expect(err).toBeFalsy();
    // 断开
    con.end();
    done();
  });
});
