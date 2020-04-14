const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;

// Middlewares
app.use(morgan('dev'));

app.use(express.json());
// Middleware to for the req-res pipeline
app.use((req, res, next)=> {
  console.log('Testing out this middleware 💪🏾');
  next();
})

// Spinner
const ora = require('ora');
// const throbber = ora('Shimmy shimmy yay, shimmy yay, shimmy ya. Swalla-la-la').start();
const throbber = ora({
  text: 'Shimmy shimmy yay, shimmy yay, shimmy ya. Swalla-la-la on ',
  frames: ['∙∙∙', '●∙∙', '∙●∙', '∙∙●', '∙∙∙'],
  interval: 300,
}).start();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROute Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

const getTour = (req, res) => {
  console.log(req.params);
  // convert the value pair in the obj to number
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);
  if (!tour || id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
}

const createTour =  (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success!',
        data: {
          tour: newTour,
        },
      });
    }
  );
}

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
	}
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Tour updated ...>'
		}
	});
}

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
	}
	res.status(204).json({
		status: 'success',
		data: null
	});
}

const getAllUsers = (req, res)=>{
  res.status(500).json({
    status: 'error',
    message: "route is not yet defined"
  })
}

const getAllUsers = (req, res)=>{
  res.status(500).json({
    status: 'error',
    message: "route is not yet defined"
  })
}
const getUser = (req, res)=>{
  res.status(500).json({
    status: 'error',
    message: "route is not yet defined"
  })
}
const createUser = (req, res)=>{
  res.status(500).json({
    status: 'error',
    message: "route is not yet defined"
  })
}
const updateUser = (req, res)=>{
  res.status(500).json({
    status: 'error',
    message: "route is not yet defined"
  })
}
const deleteUser = (req, res)=>{
  res.status(500).json({
    status: 'error',
    message: "route is not yet defined"
  })
}

// Routes
// Mounting the Routers
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour)

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

setTimeout(() => {
  throbber.stopAndPersist({
    symbol: ['💪🏾', '💪🏾', '💪🏼', '💪🏻'],
    text: 'All done, do somefin else!',
  });
}, 1000 * 5);

// Start server
app.listen(port, () => {
  console.log(`Port ${port}...`);
});
