const express = require('express');
const app = express();
const route = require('./routes/route');

const bodyParser = require("body-parser");
var db = require( './config/connect_db' );

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(80);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

route(app);


db.connectToServer( function( err ) {
  if (err) throw err;
  console.log("Database connected!");
} );

