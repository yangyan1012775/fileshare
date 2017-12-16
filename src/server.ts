import * as Express from "express";
export class Server {
  private _server: Express;
  private _port: Number;

  constructor(server: Express, port = 8080) {
    this._server = server;
    this._port = port;
  }
  get server(): Express { return this._server };
  set server(server: Express) { this._server = server };
  listen() {
    return this._server.listen(this._port);
  }
}
