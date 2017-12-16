import { Server } from './server';
import * as Express from "express";
const server = new Server(Express(), process.env.PORT);
export default server.listen();