import * as React from 'react';

import { View, Button, Text } from 'react-native';

function MenuScreen({ navigation }) {
  return (
    <View>
      <Text>Aici ceva pagina de prezentare</Text>
      <Button
        title='Start Shopping'
        onPress={() => {
          navigation.navigate('Shops List');
        }}
      />
    </View>
  );
}

export default MenuScreen;
