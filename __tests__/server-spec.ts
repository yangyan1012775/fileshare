import { Server } from '../src/server';
import * as express from "express";

test('Should greet with message', () => {
  const express1 = express();
  const express2 = express();
  expect(express1 !== express2).toBe(true);
  const server = new Server(express1);
  expect(server.server).toBe(express1);
  server.server = express2;
  expect(server.server).toBe(express2);
});
