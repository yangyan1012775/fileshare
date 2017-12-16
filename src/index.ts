import * as Express from "express";
<<<<<<< HEAD
=======
import { Server } from './server';
>>>>>>> 3065b90df69802b344b0dc60149d138535a496a4
const server = new Server(Express(), process.env.PORT);
export default server.listen();