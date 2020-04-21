const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const app = require('./app');
const port = process.env.PORT|| 3000;


// console.log(process.env)

// START SERVER
app.listen(port, () => {
  console.log(`Port ${port}...`);
});