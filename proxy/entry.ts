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

app.post('/target', async (req, res) => {
  if (req.query.AUTH !== Bun.env.PROXY_AUTH) {
    throw new Error('invalid auth!');
  }

  console.log('target updated');
  //TODO distruggi proxy(...) e creane uno nuovo con il nuovo ip
  res.send({ status: 'success' });
});

app.use(log);
app.use(proxy(Bun.env.PROXY_TARGET));

//start the server
app.listen(Bun.env.PROXY_PORT, () => {
  console.log(`proxy is running on port ${Bun.env.PROXY_PORT}`);
});
