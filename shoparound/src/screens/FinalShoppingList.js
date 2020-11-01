import * as React from 'react';

import { View, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';

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
          navigation.navigate('Fastest Route', { shoppingList });
        }}
      />
    </View>
  );
}

export default ShoppingListScreen;
