import * as React from 'react';

import { View, Button } from 'react-native';

function ShopsListScreen({ navigation }) {
  return (
    <View>
      <Button
        title='Auchan'
        onPress={() => {
          navigation.navigate('Shops Location');
        }}
      />
      <Button title='Carrefour' />
      <Button title='MegaImage' />
    </View>
  );
}

export default ShopsListScreen;
