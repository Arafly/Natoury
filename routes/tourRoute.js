const express = require('express');
const tourController = require('./../controllers/tourController')
// Alternative way - Destructuring
// const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('./../controllers/tourController')

const router = express.Router();

// Params middleware
router.param('id', (req, res, next)=> {
    console.log(`Tour id is: ${id}`);
    next();
})

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);


module.exports = router;
