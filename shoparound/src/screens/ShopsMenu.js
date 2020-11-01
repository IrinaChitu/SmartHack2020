import React, { useState } from 'react';

import { View, Button } from 'react-native';
import axios from 'axios';

function ShopsListScreen({ navigation }) {
  const [shops, setShops] = useState([]);

  axios
    .get('https://shoparound-db-api.herokuapp.com/shops')
    .then(function (response) {
      console.log(response.data);
      setShops(response.data);
    })
    .catch(function (error) {
      console.log(error);
      //Perform action based on error
    });

  return (
    <View>
      {shops.map((it) => {
        return (
          <Button
            title={it.shopName}
            onPress={() => {
              navigation.navigate('Shops Location', { shopId: it.id });
            }}
          />
        );
      })}
      {/* <Button
        title='Auchan'
        onPress={() => {
          navigation.navigate('Shops Location');
        }}
      />
      <Button title='Carrefour' />
      <Button title='MegaImage' /> */}
    </View>
  );
}

export default ShopsListScreen;
