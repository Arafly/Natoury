const app = require('./app');
const port = 3000;

// START SERVER
app.listen(port, () => {
    console.log(`Port ${port}...`);
  });