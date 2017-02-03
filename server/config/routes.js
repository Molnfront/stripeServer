
//controllers
var user = require('../controllers/users.js');

module.exports = function(app){

  app.get('/', function(req, res){
    console.log("you are at the root");
    res.render('index',{});
  });

  //register
  app.post('/register', function(req,res){
    user.register(req,res);
    res.redirect('/');
  });
    // stripe c.r.u.d.
  //retrieve customer
  app.get('/user',function(req,res){
    user.getCustomer(req,res);
  });
  //add a new payment source
  app.post('user/sources', function(req,res){
    user.newCard(req,res);
  });
  //change default payment method
  app.post('user/default_source', function(req, res){
    user.updateDefaultPaymentMethod(req,res);
  });
  // ******* IGNORE THESE FOR NOW ********* //

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
