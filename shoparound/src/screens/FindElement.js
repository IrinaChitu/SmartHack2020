import * as React from 'react';

import { View, Button, Text, Alert } from 'react-native';

function FindProductScreen({ route, navigation }) {
  var { search } = route.params;
  var { shoppingList } = route.params;

  return (
    <View>
      {!shoppingList.includes(search) ? ( // here must search in database
        <Button
          title='Add to shopping list'
          onPress={() => {
            shoppingList.push(search);
            navigation.pop();
            navigation.pop();
            navigation.push('Create Shopping List', { shoppingList });
          }}
        />
      ) : (
        <Button
          title='Product Unavailable. Go back to shopping list'
          onPress={() => {
            navigation.pop();
          }}
        />
      )}
    </View>
  );
}

export default FindProductScreen;
