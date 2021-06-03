// require libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
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
mongoose.connect('mongodb+srv://test:test@arrypt.2dhwg.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const reviews = require('./controllers/reviews')(app);

// define app route
app.listen(3000, () =>{
    console.log(`App listening on port 3000!`);
})