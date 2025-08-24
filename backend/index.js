import express from 'express';
import cors from 'cors';
import dialogRouter from './router/dialogRouter.js';
import logicRouter from './router/logicRouter.js';

const server = express();
server.use(express.json());
server.use(cors({
  origin: "http://localhost:5173"
}));
server.use('/dialog', dialogRouter);
server.use('/api', logicRouter);

server.listen(3000, () => {
  console.log("Server run on 3000")
})