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
    const id = shop.id;
    const { shopName } = shop.data();
    shops.push({ id, shopName });
  });
  
  return shops;
}

app.get('/shops', async (req, res) => {
  let shops = await getShops();

  console.log(shops);

  res.send(shops);
})

app.get('/items', async function(req, res) {
  let shopId = req.query.id;

  const itemsRef = firebaseDb.collection('users')
                  .doc(shopId)
                  .collection('items');

  let items = [];
  const snapshot = await itemsRef.get();

  snapshot.forEach((item) => {
    const id = item.id;
    const { name } = item.data();
    items.push({ id, name, description, category });
  });

  res.send({items: items});
});

app.get('/shelves', async function(req, res) {
  let shopId = req.query.id;

  const shelvesRef = firebaseDb.collection('users')
                  .doc(shopId)
                  .collection('shelves');

  let shelves = [];
  const snapshot = await shelvesRef.get();

  snapshot.forEach((item) => {
    const coords = item.id.split('|');
    const x = coords[0];
    const y = coords[1];
    shelves.push({ id, x, y});
  });

  res.send({shelves: shelves});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));