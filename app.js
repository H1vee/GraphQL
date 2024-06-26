const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { graphqlHTTP } = require('express-graphql');

const carSchema = require('./schema/carSchema');
const clientSchema = require('./schema/clientSchema');
const rentalSchema = require('./schema/rentalSchema');
//const schema = require('./schema/root_schema');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/cars', graphqlHTTP({
    schema: carSchema,
    graphiql: true,
}));

app.use('/api/clients', graphqlHTTP({
    schema: clientSchema,
    graphiql: true,
}));

app.use('/api/rentals', graphqlHTTP({
    schema: rentalSchema,
    graphiql: true,
}));
// app.use(
//     '/api',
//     graphqlHTTP({
//         schema,
//         graphiql: true,
//     }),
// );

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
