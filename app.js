const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');

//Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');
const employeesRouter = require('./routes/employeeRouter');
const customersRouter = require('./routes/customerRouter');
const projectsRouter = require('./routes/projectRouter');
const uploadRouter = require('./routes/uploadRouter');

//MongoDB
const config = require('./config/mongodb');
const mongoose = require('mongoose');

const url = config.mongoUrl;

const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connect.then(
	(db) => {
		console.log('Connected to Mongo Database!\n');
	},
	(err) => {
		console.log(err);
	}
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize()); //Authentication

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);
app.use('/customers', customersRouter);
app.use('/projects', projectsRouter);
app.use('/uploads', uploadRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
