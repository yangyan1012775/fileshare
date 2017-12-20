import { Server } from '../src/server';
import * as Express from 'express';
import * as request from 'supertest';
import * as mysql from 'mysql';
import cbFunc from '../src/cb/cb';
import * as assert from 'assert';
var debug = require('debug')('xxx');

const app = Express();
const server = new Server(app, 3000);

test('测试数据库创建', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });

  con.query('CREATE DATABASE cloud', function(err) {
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
    }
  );
});

test('测试数据库链接', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  // 创建file
  con.query(
    'create table file (id int primary key auto_increment,filename varchar(255) NOT NULL,type varchar(20) NOT NULL,size int(11) NOT NULL,downloads int(11) NOT NULL,hash varchar(64) NOT NULL)',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success file');
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
    }
  );
});

test('测试数据库链接', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  // 创建user_file
  con.query(
    'CREATE TABLE user_file (id int primary key auto_increment,user int(11) NOT NULL,file int(11) NOT NULL,uploaded_at datetime NOT NULL)',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success user_file');
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
        'INSERT INTO `user_file` (`user`, `file`, `uploaded_at`) values ?',
        [data],
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
test('/hot/video读取测试', done => {
  request(app)
    .get('/api/files/hots?type=video')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body[0].username === 'user1').toBeTruthy();
      done();
    });
});
test('/hot/zip读取测试', done => {
  request(app)
    .get('/api/files/hots?type=zip')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body[0].username === 'user4').toBeTruthy();
      done();
    });
});
test('/hot/image读取测试', done => {
  request(app)
    .get('/api/files/hots?type=image')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body[0].username === 'user6').toBeTruthy();
      done();
    });
});
test('/hot/doc读取测试', done => {
  request(app)
    .get('/api/files/hots?type=doc')
    .expect(200, function(err, res) {
      expect(err).toBeFalsy();
      expect(res.body[0].username === 'user8').toBeTruthy();
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
