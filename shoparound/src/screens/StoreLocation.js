import * as React from 'react';

import { View, Button } from 'react-native';

function StoreLocationScreen({ route, navigation }) {
  var { shopId } = route.params;

  return (
    <View>
      <Button
        title='Nerva Traian'
        onPress={() =>
          navigation.navigate('Create Shopping List', {
            shoppingList: [],
            shopId,
          })
        }
      />

      <Button title='Orhideea' />
    </View>
  );
}

export default StoreLocationScreen;
