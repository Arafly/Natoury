const express = require('express');
const app = express();
const morgan = require('morgan');


const tourRouter = require('./routes/tourRoute')
const userRouter = require('./routes/userRoute')

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
// Middleware to for the req-res pipeline
app.use((req, res, next)=> {
  console.log('Testing out this middleware 💪🏾');
  next();
})

// SPINNER
const ora = require('ora');
const throbber = ora({
  text: 'Shimmy shimmy yay, shimmy yay, shimmy ya. Swalla-la-la on ',
  frames: ['∙∙∙', '●∙∙', '∙●∙', '∙∙●', '∙∙∙'],
  interval: 300,
}).start();


// ROUTES
// Mounting the Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


setTimeout(() => {
  throbber.stopAndPersist({
    symbol: ['💪🏾', '💪🏾', '💪🏼', '💪🏻'],
    text: 'All done, do somefin else!',
  });
}, 1000 * 5);

module.exports = app;
