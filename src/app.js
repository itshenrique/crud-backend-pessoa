import express from 'express';
import log from 'fancy-log';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import db from './database/neo4jApi';

// This function init the database
db.init();

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Resource does not exist');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  return res.status(err.status || 500).json({
    error: {
      message: err.message,
      error: {},
    },
    status: false,
  });
});

// configure port and listen for requests
const port = 3000;

export const server = app.listen(port, () => {
  log(`Server is running on http://localhost:${port} `);
});

export default app;
