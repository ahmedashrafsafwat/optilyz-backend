const express = require("express");
var cors = require("cors");
require('./config/config');
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const port = process.env.PORT
const serviceName = process.env.SERVICE_NAME
// connect to db
require('./models');


// Create express server
let app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressValidator());

//require only the running service only 
const route = require(`./routes/${serviceName}.js`);
app.use(`/${serviceName}`, route)

app.listen(port, () => {
    console.log(`${serviceName} service is running at http://localhost:${port} `);
});



module.exports = app;