import React, { useState } from 'react';

import { View, Button } from 'react-native';

function MenuScreen({ navigation }) {
  return (
    <View>
      <Button
        title='Start shopping'
        onPress={() => {
          navigation.navigate('Shops List');
        }}
      />
      <Button
        title='Create Shopping List'
        onPress={() => {
          navigation.navigate('Create Shopping List', { shoppingList: [] });
        }}
      />
    </View>
  );
}

export default MenuScreen;
