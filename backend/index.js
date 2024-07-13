/* eslint-disable no-process-exit */
/* eslint-disable no-undef */
const config = require('config');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('./middleware/oauth.js');
require('express-async-errors');

const corsOptions = {
  origin: 'https://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: config.get('secret'),
  resave: false,
  saveUninitialized: false,

}));


app.use(passport.initialize());
app.use(passport.session());
require('./start/routes.js')(app);
require('./start/connectDb.js')();

const PORT = config.get('app.port') || 3000;


process.on('unhandledRejection', reason => {
  console.error('FATAL ERROR: Unhandled Rejection:', reason);
  process.exit(1);
});
process.on('uncaughtException', error => {
  console.error('FATAL ERROR: Uncaught Exception:', error);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
