# Things to do for testing (v1):

1. run npm install to pick up deps.
2. make an .env file with these vars:
  - SV_PORT=8000
  - STRIPE_SECRET= <YOUR SECRET TEST KEY>
  - STRIPE_PUB= <YOUR SECRET PUBLISHABLE KEY>
3. in firebase console
  1. go to [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)
  2. select firebase project
  3. Click the Generate New Private Key button at the bottom of the Firebase Admin SDK section of the Service Accounts tab.  This will download a json file needed to authenticate your firebase usage.
  4. remember to set this key in your .gitignore (in the event you're pushing commits to the master later...)
4. in server
  1. /config
    - take the key you generated in step 3.3 and place it in server/config
  2. /config/firebase.js
    - place the reference to your serviceAccountKey.json and leave it commented out (this will be used later when the app goes fully modular. Note: this won't cause errors right now, because it's commented out, but you will see you need to repeat this step in the current working file below. this is just to make you aware of where it will be in the future.)
    - place the url of your database in the commented out file (see the previous note for why we're doing this.)
5. in controllers
  1. /users.js
    - repeat steps in 4.2 for the live code to auth and present no errors.
    - place your test customer id in the following functions:
      - getCustomer
      - newCard
      - updateDefaultPaymentMethod
    - ignore all other functions for now.
6. (optional) setup .gitignore  for later pushing
7. test.
