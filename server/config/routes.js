
//controllers
var user = require('../controllers/users.js');


module.exports = function(app){

  var bodyParser   = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.get('/', function(req, res){
    // res.render('index',{});
    console.log("you are at the root");
  });
  // stripe c.r.u.d.

  //retrieve customer
  app.get('/customer',function(req,res){
    user.getCustomer(req,res);
  });
  //add a new payment source
  app.post('customer/sources', function(req,res){
    user.newCard(req,res);
  });
  //change default payment method
  app.post('customer/default_source', function(req, res){
    user.updateDefaultPaymentMethod(req,res);
  });







  // ******* IGNORE THESE FOR NOW ********* //
  //register
  app.post('/register', function(req,res){
    user.register(req,res);
    res.redirect('/');
  });
  // get all users
  app.get('/users', function(req, res){
    user.getAll(req,res);
  });
  //get one
  app.get('/users/:name', function(req, res){
    user.getOne(req,res);
  });
  app.get('/test_charge', function(req, res){
    res.render('test_charge',{pub: pub});
  });
  app.post("/test_charge_res", (req, res) => {
    user.test_charge(req,res);
    res.redirect('/');
  });

}
