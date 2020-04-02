const fs = require('fs')
const express = require('express');
const app = express();
const port = 3000;

// 
const ora = require('ora');
// const throbber = ora('Shimmy shimmy yay, shimmy yay, shimmy ya. Swalla-la-la').start();
const throbber = ora({
    text: 'Shimmy shimmy yay, shimmy yay, shimmy ya. Swalla-la-la on ',
    frames: [
        "∙∙∙",
        "●∙∙",
        "∙●∙",
        "∙∙●",
        "∙∙∙"
    ],
    interval: 300,
}).start();

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
    })
})

app.post('/api/v1/tours', (req, res)=> {
    
})

setTimeout (()=> {
    throbber.stopAndPersist({
        symbol: ["💪🏾","💪🏾","💪🏼","💪🏻"],
        text: 'All done, do somefin else!',
    });
}, 1000 * 5);

// Start server
app.listen(port, ()=> {
    console.log(`Port ${port}...`)
})