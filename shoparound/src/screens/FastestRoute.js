import * as React from 'react';

import { View, Image, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';

function FastestRouteScreen({ route, navigation }) {
  var { shoppingList } = route.params;
  return (
    <View>
      {/* <Image
        // style={styles.stretch}
        source={require('../demo-road.jpg')}
      /> */}
      <ImageZoom
        cropWidth={400}
        cropHeight={400}
        imageWidth={200}
        imageHeight={200}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../demo-road.jpg')}
        />
      </ImageZoom>
      {shoppingList.map((it) => {
        return <CheckBox title={it} checked={true} />;
      })}
      {/* <FlatList
        data={shoppingList}
        renderItem={(it) => <CheckBox title={it} checked={true} />}
      /> */}
    </View>
  );
}

export default FastestRouteScreen;
