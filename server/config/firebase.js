var admin = require("firebase-admin");

//place the serviceAccount key in server/config
var serviceAccount = require("./hostedFirebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hostedserver-c8f71.firebaseio.com/",
  databaseAuthVariableOverride: {
  uid: "my-service-worker"
  }
});

module.exports = admin;
