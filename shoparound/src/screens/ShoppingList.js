import React, { Component, useState } from 'react';

import {
  View,
  Button,
  Alert,
  SectionList,
  Text,
  StyleSheet,
} from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import firebase from '../config.js';

// let itemsRef = db.ref('/items');

// function getAllProducts() {
// db.ref('/users').on('value', (querySnapShot) => {
//   let data = querySnapShot.val() ? querySnapShot.val() : {};
//   console.log(...data);
// });
// const ref = await firestore().collection('users');
// var db = firebase.firestore.collection('users');
// db.onSnapshot(getCollection);
// }

// function getCollection(querySnapShot) {
//   querySnapShot.forEach((result) => {
//     console.log(result.data);
//   });
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function getCheckedStatus(shoppingList, productName) {
  if (shoppingList.includes(productName)) return true;
  else return false;
}

class ShoppingItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: getCheckedStatus(this.props.shoppingList, this.props.item),
    };
  }

  updateBox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    return (
      <CheckBox
        center
        title={this.props.item}
        checked={this.state.isChecked}
        onPress={() => {
          if (this.state.isChecked) {
            this.props.shoppingList.pop(this.props.item);
          } else {
            this.props.shoppingList.push(this.props.item);
          }
          this.updateBox();
        }}
        // style='visibility: false'
      />
    );
  }
}

function getProductsInStock() {
  var products = ['lemon', 'apple', 'nuts', 'lime', 'fifa', 'firogaf'];
  products.sort();

  // console.log(products);

  var i = 1;
  var lastChar = products[0][0];
  var allProducts = [];
  var section = { title: products[0][0], data: [products[0]] };
  while (i < products.length) {
    if (products[i][0] === lastChar) {
      section.data.push(products[i]);
    } else {
      lastChar = products[i][0];
      allProducts.push(section);
      section = { title: products[i][0], data: [products[i]] };
    }
    i++;
  }
  allProducts.push(section);
  // console.log(allProducts);
  return allProducts;
}

function CreateShoppingListScreen({ route, navigation }) {
  var { shoppingList } = route.params;
  const [search, setSearch] = useState('');

  return (
    <View>
      <SearchBar
        lightTheme={true}
        placeholder='Type Here...'
        onChangeText={setSearch}
        value={search}
      />

      <Button
        title='Find'
        onPress={() => {
          navigation.navigate('Find Product', { search, shoppingList });
        }}
      />
      {/* <Button
        title='Show Search'
        onPress={() => {
          console.log(search);
        }}
      /> */}
      {/* <Button
        title='Show Shopping List'
        onPress={() => {
          console.log(shoppingList);
        }}
      /> */}
      <Button
        title='Finish shopping list'
        onPress={() => {
          navigation.navigate('Shopping List', { shoppingList });
        }}
      />
      <SectionList
        sections={getProductsInStock()}
        renderItem={({ item }, idx) => (
          <ShoppingItem key={idx} item={item} shoppingList={shoppingList} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

export default CreateShoppingListScreen;
