// require libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
require('dotenv').config();
const app = express();

// middleware
var exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'));
app.use(express.static('public'));

// set the templating engine -> handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main',
handlebars: allowInsecurePrototypeAccess(Handlebars)}))

app.set('view engine', 'handlebars');

// connects our server with MongoDB client
mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@arrypt.2dhwg.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true })
// ${process.env.USERNAME} ${process.env.PASSWORD}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
require('./controllers/auth.js')(app);

// define app route
app.listen(process.env.PORT || 3000, () =>{
    console.log(`App listening on port ${process.env.PORT}!`);
})

module.exports = app;