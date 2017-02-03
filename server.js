
// remember to add your own key for testing... //
// globals used in .env: STRIPE_SECRET, STRIPE_PUB, SV_PORT       //
require('dotenv').config();

var express      = require('express'),
    path         = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    port         = process.env.SV_PORT,
    app          = express();

//instantiation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"./client")));
// migrating to angular

// app.set('views', __dirname + "/client/views");
// app.set('view engine', 'ejs');

//routes
require('./server/config/routes.js')(app);

//database config goes here
require('./server/config/firebase.js');


//listen
app.listen(port, function(){
    console.log("Welcome to port "+ port +", you h@xz0r...");
})
