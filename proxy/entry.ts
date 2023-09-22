import cors from 'cors';
import express from 'express';
import proxy from 'express-http-proxy';
import log from './middlewares/middleware.log';

if (!Bun.env.PROXY_TARGET) {
  throw new Error('PROXY_TARGET is not set');
}

//init an express app
const app = express();

//add middleware
app.use(cors());
app.use(log);
app.use(proxy(Bun.env.PROXY_TARGET));

//start the server
app.listen(Bun.env.PROXY_PORT, () => {
  console.log('bff is running on port 3000');
});
