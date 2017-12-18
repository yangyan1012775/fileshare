import * as Express from 'express';
import { Server } from './server';
const server = new Server(Express(), process.env.PORT);
export default server.listen();
