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

function getAllProducts() {
  // db.ref('/users').on('value', (querySnapShot) => {
  //   let data = querySnapShot.val() ? querySnapShot.val() : {};
  //   console.log(...data);
  // });
  // const ref = await firestore().collection('users');
  // var db = firebase.firestore.collection('users');
  // db.onSnapshot(getCollection);
}

function getCollection(querySnapShot) {
  querySnapShot.forEach((result) => {
    console.log(result.data);
  });
}

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
  // var products = ['lemon', 'apple', 'nuts'];
  // products.sort();
  // for (var i = 0; i < products.length; i++) {
  //   // console.log(product);
  //   var section = { title: products[i], data: [products[i]] };
  //   section.data.push(products[i]);
  // }

  var allProducts = getAllProducts();
  console.log(allProducts);
}

function CreateShoppingListScreen({ route, navigation }) {
  var { shoppingList } = route.params;
  const [search, setSearch] = useState('');
  var productsInStock = getProductsInStock();

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
      <Button
        title='Show Search'
        onPress={() => {
          console.log(search);
        }}
      />
      <Button
        title='Show Shopping List'
        onPress={() => {
          console.log(shoppingList);
        }}
      />
      <Button
        title='Finish shopping list'
        onPress={() => {
          navigation.navigate('Shopping List', { shoppingList });
        }}
      />
      <SectionList
        sections={dataList}
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

var dataList = [
  { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
  {
    title: 'J',
    data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'],
  },
];
