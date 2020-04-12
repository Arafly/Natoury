const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
//
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

// Routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('api/v1/tours/:id', (req, res) => {
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
});

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
