const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const path = require('path');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const numext = require('./utils/Number-ext');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false,
}));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// add Handlebars render engine
app.engine('handlebars', exphbs());
app.set('views', config.views_path);
app.set('view engine', 'handlebars');

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// add React middlewares
app.use(express.static(path.join(__dirname, "..", "user")));
app.use(express.static(path.join(__dirname, "..", "office")));
app.use(express.static(path.join(__dirname, "..", "manager")));
app.use(express.static("public"));

app.get('/users/:id', (req, res, next) => {
  res.render('users', {id : req.params.id});
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "user", "index.html"));
});

app.get('/office', (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "office", "index.html"));
});

app.get('/manager', (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "manager", "index.html"));
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
