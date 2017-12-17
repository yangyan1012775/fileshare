import * as Express from 'express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
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
  get server(): Express { return this._server; }
  set server(server: Express) { this._server = server; }
  public listen() {
    return this._server.listen(this._port);
  }
  public init(app: Express) {
    app.set('view engine', 'html');
    nunjucks.configure(path.resolve(__dirname, 'views'), {
      autoescape: true,
      express: app,
    });
    app.use(Express.static(path.join(__dirname, 'public')));
  }
  public initRouters(app: Express) {
    app.use('/user', user);
    app.use('/admin', admin);
  }
}
