const fs = require('fs')
const express = require('express');
const app = express();
const port = 3000;

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Routes
app.get("/api/v1/tours", (req, res)=> {
    res
        .status(200)
        .json({
            status: "Success",
            results: tours.length,
            data: {
                tours
            },
            message: "Hello there, this a refresher!!"
    })
})

// Start server
app.listen(port, ()=> {
    console.log(`Keeping eyes peeled on ${port}...`)
})