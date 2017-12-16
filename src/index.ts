import { Server } from './server';
import * as Express from "express";
let server = new Server(Express(), 3000);
export default server.listen();