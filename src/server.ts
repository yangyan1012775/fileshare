import * as bodyParser from 'body-parser';
import * as Express from 'express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import api_admin from './routes/api/admin';
import files from './routes/api/file';
import users from './routes/api/users';
import admin from './routes/url/admin';
import user from './routes/url/user';
export class Server {
  private _server: Express;
  private _port: number;

  constructor(server: Express, port = 8080) {
    this._server = server;
    this._port = port;
    this.init(server);
    this.initRouters(server);
  }
  get server(): Express {
    return this._server;
  }
  set server(server: Express) {
    this._server = server;
  }
  public listen() {
    return this._server.listen(this._port);
  }
  public init(app: Express) {
    app.set('view engine', 'html');
    nunjucks.configure(path.resolve(__dirname, 'views'), {
      autoescape: true,
      express: app,
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(Express.static(path.join(__dirname, 'public')));
  }
  public initRouters(app: Express) {
    app.use('/user', user);
    app.use('/admin', admin);
    app.use('/api/admin', api_admin);
    app.use('/files', files);
    app.use('/api/users', users);
  }
}
