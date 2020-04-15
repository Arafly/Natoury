const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROute Handlers
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
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
};

exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Tour updated ...>',
        },
    });
};

exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
};