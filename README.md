[![Build Status](https://travis-ci.org/rugao-web-fullstack/fileshare.svg?branch=master)](https://travis-ci.org/rugao-web-fullstack/fileshare)
[![Coverage Status](https://coveralls.io/repos/github/rugao-web-fullstack/fileshare/badge.svg?branch=master)](https://coveralls.io/github/rugao-web-fullstack/fileshare?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

云分享
===

1. 2017-12-13

a. 组长讨论实现数据库设计，由班长汇总提交
b. 设计相关的API
c. 所有前端页面基于API

2. 2017-12-15
a. 完成工作量的评估

3. 2017-12-18
a. 完成基本的功能

4. 2017-12-20
a. 验收完成
b. 上线

# 文件云分享项目

## 前端

## 目标

熟悉移动端+PC端的响应式Web开发

理解HTML+CSS的作用

巩固所学习的知识

初步了解项目开发所需要的知识

## 环境配置

OS： Linux(Ubuntu)等开源OS

编辑器： vscode/vim/emacs/gedit等开源编辑器

浏览器： chromium/firefox等开源浏览器

## 前端开发要求

1. 能正常在chromium/firefox下面执行
2. 模拟出来所有的过程，跑通所有的业务
3. 不需要后台服务器参与
4. 请求数据通过ajax模拟
5. 有一定的用户体验
6. 对接上API后就可以直接使用
7. 能在多屏环境下保持功能上基本的统一

## 后端开发要求

1. 必须测试通过
2. 使用100%覆盖
3. 基于VIG API设计API
4. 基于nunjuncks模板

## 技术栈

HTML(5) + CSS(3) + js

jquery + bootstrap

express + typescript

## 功能

### 用户

#### 基本
1. 注册，登录，退出
2. 个人信息维护
3. 密码找回与更新
4. 头像及更新

#### 提高
1. 第三方登录(github, google, weibo, qq, weixin)
2. 验证码生成

### 文件
1. 上传（需要有目录的概念），删除，重命名
2. 下载（设置下载密码，下载的权限）
3. 分享
4. 能区分文件类型
5. 图片可以显示，视频可以播放，文本可以预览
6. 查看文件列表，分页显示

## 管理平台
### 管理员
1. 管理员的登录，个人信息维护

### 审核员

### 管理界面

1. 用户管理（锁定用户）
2. 文件管理（删除，隐藏，只读）
3. 文件审核（通过，不通过）

### 统计信息
1. 注册用户量（日注册，月注册，年注册）
2. 访问量（日访问，月访问，年访问）
3. 上传的文件数（分类的文件数，图片，视频，音频，文档，程序）
4. 上传，下载量统计（总量，分类量）

## 首页或者公开页面

1. 项目介绍
2. 项目理念
3. 热门文件
4. 分类热门
