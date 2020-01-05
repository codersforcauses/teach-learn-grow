import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './config';
import { jwtCheck } from './services/auth';
import { upsertUser, retrieveUser } from './controllers/user';
import { addMessage, removeMessage, getFeed } from './controllers/message';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// user
app.post(`/user`, jwtCheck, upsertUser);
app.get('/currentUser', jwtCheck, retrieveUser);

// messages
app.post('/message', jwtCheck, addMessage);
app.delete('/message/:id', jwtCheck, removeMessage);
app.get('/feed', jwtCheck, getFeed);

app.listen(PORT, () => {
  const localUrl = `http://localhost:${PORT}`;
  const exampleUrl = 'http://pris.ly/e/ts/rest-express#5-using-the-rest-api';
  console.log(`🚀 Server ready at: ${localUrl}`);
  console.log(`⭐️ See sample requests: ${exampleUrl}`);
});

export default app;
