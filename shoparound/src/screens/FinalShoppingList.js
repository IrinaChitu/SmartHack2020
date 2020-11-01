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
    .then(function (response, result) {
      console.log(response.data);
      result.send(response.data);
      return response.data;
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
          //var imageUrl = testAPI();
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
              // console.log(response.data);
              // result.send(response.data);
              // return response.data;
              let imgData = response.data;
              console.log(imgData);
              navigation.navigate('Fastest Route', { shoppingList, imgData });
            })
            .catch(function (error) {
              console.log(error);
              //Perform action based on error
            });
        }}
      />
    </View>
  );
}

export default ShoppingListScreen;
