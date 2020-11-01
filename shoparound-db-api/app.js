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

async function getShops() {
  const usersRef = firebaseDb.collection('users')
  
  let shops = [];
  const snapshot = await usersRef.get();
  snapshot.forEach((shop) => {
    console.log(shop.data());

    const id = shop.id;
    const { shopName } = shop.data();
    shops.push({ id, shopName });
  });

  console.log(shops);
  
  return shops;
}

app.get('/shops', (req, res) => {
  let shops = getShops();

  console.log(shops);

  res.send(shops);
})

// app.get('/items', async function(req, res) {
//     let users = getShops();

//     const itemsRef = firebaseDb.collection('users')
//                     .doc(authUser)
//                     .collection('items');

//     console.log(itemsRef);
//     itemsRef.get().then((snapshot) => {
//       let items = [];

//       snapshot.forEach((item) => {
//         console.log(item.data());

//         const id = item.id;
//         const { name, description, category } = item.data();
//         items.push({ id, name, description, category });
//       });
  
//       res.send({items: items});
//     }).catch((err) => {
//       res.send(err);
//     });
// });

app.listen(port, () => console.log(`Server listening on port ${port}!`));