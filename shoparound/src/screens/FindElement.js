import * as React from 'react';

import { View, Button, Text, Alert } from 'react-native';

function FindProductScreen({ route, navigation }) {
  var { search } = route.params;
  var { shoppingList } = route.params;

  return (
    <View>
      <Text>Daca exista in db atunci add</Text>
      {!shoppingList.includes(search) ? (
        <Button
          title='Add'
          onPress={() => {
            shoppingList.push(search);
            navigation.navigate('Create Shopping List', { shoppingList });
          }}
        />
      ) : (
        <Button
          title='Go back to search'
          onPress={() => {
            navigation.pop();
          }}
        />
      )}
      <Text>Altfel apare buton</Text>
    </View>
  );
}

export default FindProductScreen;
