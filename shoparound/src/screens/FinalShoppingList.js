import React, { useState } from 'react';
import axios from 'axios';

import { Buffer } from 'buffer';
import { View, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';

function testAPI() {
  // const [imageUrl, setImageUrl] = useState('');
  var imageUrl = '';
  var myParams = {
    rows_num: 6,
    cols_num: 11,
    start_pos: [5, 1],
    finish_pos: [2, 10],
    shelves: [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [1, 7],
      [1, 8],
      [1, 9],
      [4, 2],
      [4, 3],
      [4, 7],
      [4, 8],
      [4, 9],
    ],
    interest: [
      [0, 4],
      [0, 8],
      [2, 0],
      [3, 2],
      [3, 8],
      [5, 2],
      [5, 9],
    ],
  };

  axios
    .post('http://shoparound-smart.herokuapp.com/getimage/', myParams)
    .then(function (response) {
      var x = new Buffer(response.data, 'binary').toString('base64');
      // console.log(x);
      imageUrl = 'data:image/png;base64,' + x.toString;
      // this.setState({
      //   image_url: 'data:image/png;base64,' + x
      // });
      // console.log(imageUrl);
      return imageUrl;
    })
    .catch(function (error) {
      console.log(error);
      //Perform action based on error
    });
}

function ShoppingListScreen({ route, navigation }) {
  var { shoppingList } = route.params;
  return (
    <View>
      {shoppingList.map((it) => {
        return <CheckBox title={it} checked={true} />;
      })}
      <Button
        title='Get Fastest Route'
        onPress={() => {
          // call api for map
          var imageUrl = testAPI();
          navigation.navigate('Fastest Route', { shoppingList, imageUrl });
        }}
      />
    </View>
  );
}

export default ShoppingListScreen;
