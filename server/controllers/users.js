var admin = require('../config/firebase.js');

var db = admin.database();
var auth = admin.auth();
var users = db.ref("users");

var secret       = process.env.STRIPE_SECRET;
var pub          = process.env.STRIPE_PUB;
var stripe       = require('stripe')(secret);

module.exports = (function(){
  return {
      //stripe basic crud.
      register: function(req, res){
        auth.createUser({
          email: req.body.email,
          emailVerified: false,
          password: req.body.password,
          displayName: req.body.displayName,
          photoURL: "http://www.example.com/12345678/photo.png",
          disabled: false
        })
          .then(function(userRecord) {
            // A UserRecord representation of the newly created user is returned
            var user = users.child(userRecord.uid);
            user.set({
              email: userRecord.email,
              photoURL: userRecord.photoURL,
              displayName: userRecord.displayName
            });
            console.log("Successfully created new user:", userRecord.uid);
          })
          .catch(function(error) {
            console.log("Error creating new user:", error);
          });
      },
      authenticate: function(req, res){

      },
      login: function(req, res){
        auth.getUserByEmail(req.body.email)
          .then(function(userRecord){
            console.log('this is a dummy for now!')
          })
      },
      getCustomer: function(req, res){
        // put your test customer here for now... until we hook up auth and db
        var customerId = 'cus_9zo8TwmTxkTY4l'; // Load the Stripe Customer ID for your logged in user
        stripe.customers.retrieve(customerId, function(err, customer) {
          if (err) {
            res.status(402).send('Error retrieving customer.');
          } else {
            res.json(customer);
          }
        })
      },
      newCard: function(req, res){
        // auth token being sent && stripe token sent
        admin.auth().verifyIdToken(idToken)
          .then(function(decodedToken) {
            var uid = decodedToken.uid;
            // ... check the db for that uid
            users.once(uid, function(data) {
              // check if stripe_cus_id in that uid
              if(data.stripe_cus_id){
                console.log("found existing stripe customer");
                // if exists we're gonna save the newcard
                var customerId = data.stripe_cus_id;
                stripe.customers.createSource(customerId, {
                  source: req.body.source
                }, function(err, source) {
                  if (err) {
                    res.status(402).send('Error attaching source.');
                  } else {
                    res.status(200).end();
                  }
                });
              }else{
                // else create user and then create source.
                console.log("no existing customer... creating a new stripe customer")
                stripe.customers.create({
                  email: data.email,
                  source: req.body.stripeToken
                }).then(function(customer){
                  stripe.customers.createSource(customer.id, {
                    source: req.body.source
                  }, function(err, source) {
                    if (err) {
                      res.status(402).send('Error attaching source.');
                    } else {
                      res.status(200).end();
                    }
                  });
                });
              }
            });
          }).catch(function(error) {
            // Handle error
            console.log("auth error: \n" + error);
          });
      },
      updateDefaultPaymentMethod: function(req, res){
        // put your test customer here for now... until we hook up auth and db
        var customerId = 'cus_9zo8TwmTxkTY4l'; // Load the Stripe Customer ID for your logged in user
        stripe.customers.update(customerId, {
          default_source: req.body.defaultSource
        }, function(err, customer) {
          if (err) {
            res.status(402).send('Error setting default source.');
          } else {
            res.status(200).end();
          }
        });
      },
      // ignore these functions for now!

      add: function(req, res){
        users.push({firstName: req.body.firstName, lastName: req.body.lastName});
      },
      test_charge: function(req, res){
        var amount = 999;
        var email = req.body.stripeEmail;
        console.log(req.body);
        stripe.customers.create({
           email: req.body.stripeEmail,
          source: req.body.stripeToken
        })
        .then(customer =>
          stripe.charges.create({
            amount,
            description: "Sample Charge",
               currency: "usd",
               customer: customer.id
          }));
      },
      getAll: function(req, res){
        users.on("value", function(snapshot) {
          console.log(snapshot.val());
          res.json(snapshot.val());
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      },
      getOne: function(req, res){
        users.orderByChild('firstName').equalTo(req.params.name).on('value', function(snapshot){
          console.log(snapshot.val());
          res.json(snapshot.val());
        }, function (errorObject){
          console.log("The read failed: " + errorObject.code);
        })
      }
  }
})();
