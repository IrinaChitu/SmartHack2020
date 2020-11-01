const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

const firebaseApp = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebaseApp.initializeApp(config);
const firebaseDb = firebaseApp.firestore();

app.get('/items', function(req, res) {
    const itemsRef = firebaseDb.collection('users')
                    .doc(authUser)
                    .collection('items');

    const snapshot = await itemsRef.get();
    if (snapshot.empty) {
      res.send({code: 400});
    }

    let items = [];
    snapshot.forEach((item) => {
      const id = item.id;
      const { name, description, category } = item.data();
      items.push({ id, name, description, category });
    });

    res.send({items: items});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));