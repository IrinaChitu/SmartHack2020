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

  const shelvesRef = firebaseDb.collection('users')
                  .doc(shopId)
                  .collection('shelves');

  let shelves = [];
  const snapshot1 = await shelvesRef.get();

  snapshot1.forEach((item) => {
    const { x, y } = item.data()
    const xx = parseInt(x);
    const yy = parseInt(y);
    shelves.push({ xx, yy });
  });
  
  console.log(shelves);

  const itemsRef = firebaseDb.collection('users')
                  .doc(shopId)
                  .collection('items');

  let items = [];
  const snapshot2 = await itemsRef.get();

  let dx = [-1, 0, 1, 0];
  let dy = [0, 1, 0, -1];

  snapshot2.forEach((item) => {
    const id = item.id;
    const { name, id_shelf } = item.data();
    const coords = id_shelf.split('|');
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);

    let foundPosition = false;
    for (let i = 0; i < 4 && !foundPosition; ++i) {
      for (let j = 0; j < 4 && !foundPosition; ++j) {
        let nx = x + dx[i];
        let ny = y + dy[j];

        for (let shelve of shelves) {
          if (nx !== shelve.xx && ny !== shelve.yy) {
            foundPosition = true;
            items.push({id, name, nx, ny});
            break;
          }
        }
      }
    }
  });

  console.log(items);

  res.send({items: items, shelves: shelves});
});

app.get('/shelves', async function(req, res) {
  let shopId = req.query.id;

  // const shelvesRef = firebaseDb.collection('users')
  //                 .doc(shopId)
  //                 .collection('shelves');

  // let shelves = [];
  // const snapshot = await shelvesRef.get();

  // snapshot.forEach((item) => {
  //   const { x, y } = item.data()
  //   shelves.push({ x, y });
  // });

  // res.send({shelves: shelves});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));