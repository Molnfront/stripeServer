// ANGULAR INIT
(function() {
  const hosted = angular.module('hosted', ['ngRoute','firebase']);
  var firebaseConfig = {
    apiKey: "AIzaSyBDY4kPMIt6PTl9GVqlfT7FGsnOxFYTtEc",
    authDomain: "hostedserver-c8f71.firebaseapp.com",
    databaseURL: "https://hostedserver-c8f71.firebaseio.com",
    storageBucket: "hostedserver-c8f71.appspot.com",
    messagingSenderId: "368936700908"
  };
  firebase.initializeApp(firebaseConfig);
  hosted.constant('firebaseConfig', firebaseConfig)
  hosted.config(function($routeProvider,$locationProvider,firebaseConfig,$firebaseRefProvider){
    $locationProvider.hashPrefix('');
    // $firebaseRefProvider.registerUrl(FirebaseDatabaseUrl);
    $firebaseRefProvider.registerUrl({
      default: firebaseConfig.databaseURL,
      users: `${firebaseConfig.databaseURL}/users`
    })
    $routeProvider
      .when('/',{
        templateUrl: '/views/home.html'
      })
      .when('/404',{
        templateUrl: '/views/404.html'
      })
      .otherwise({
        redirectTo:'/404'
      })

  });
  hosted.controller('userCtrl',function($firebaseObject,$firebaseRef){
    const db = firebase.database();
    const users = db.ref().child('users');
    const testUser = "UpObpTsmo4O9NhUST8NJSuTekkD3"
    var user = users.child(testUser);
    this.object = {
      users: $firebaseObject($firebaseRef.users),
      user: "empty"
    }
  });
}());


// OLD NON ANGULAR CODE

// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBDY4kPMIt6PTl9GVqlfT7FGsnOxFYTtEc",
//   authDomain: "hostedserver-c8f71.firebaseapp.com",
//   databaseURL: "https://hostedserver-c8f71.firebaseio.com",
//   storageBucket: "hostedserver-c8f71.appspot.com",
//   messagingSenderId: "368936700908"
// };
// firebase.initializeApp(config);
//
// const email = $("#email");
// const password = $("#password");
// const register = $("#register");
// const login = $("#login");
// const logout = $("#logout");
//
// login.click(function(e){
//   const em = email.val();
//   const pass = password.val();
//   const auth = firebase.auth();
//   const p = auth.signInWithEmailAndPassword(em,pass);
//   p.catch(function(e){
//     console.log(e.message);
//   })
//
// });
//
// register.click(function(e){
//   const em = email.val();
//   const pass = password.val();
//   const auth = firebase.auth();
//   const p = auth.createUserWithEmailAndPassword(em,pass);
//   p.catch(function(e){
//     console.log(e.message);
//   });
// });
//
// logout.click(function(e){
//   firebase.auth().signOut();
// })
// // firebase.auth().signInWithCustomToken(token).catch(function(error) {
// //   // Handle Errors here.
// //   var errorCode = error.code;
// //   var errorMessage = error.message;
// //   // ...
// // });
// firebase.auth().onAuthStateChanged(function(firebaseUser){
//   if (firebaseUser) {
//     console.log(firebaseUser);
//   }else{
//     console.log('no user');
//   }
// });
