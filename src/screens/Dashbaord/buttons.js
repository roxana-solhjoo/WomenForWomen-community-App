import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Button, Text, Block} from 'components';
import {sizes, colors} from 'styles/theme';

const CustomBtn = props => {
  const {navigation, route, text, textColor, image, size, onPress} = props;
  return (
    <Block
      space="between"
      padding={[0]}
      flex={false}
      style={styles.mainCon}
      middle
      center>
      <Button
        onPress={onPress}
        style={{width: '90%', height: '100%', backgroundColor: '#F0F0F0'}}
        center
        bottom
        opacity={0.3}>
        <Block center middle flex={2}>
          <Image
            source={image}
            style={{resizeMode: 'contain', width: size || sizes.getWidth(15)}}
          />
        </Block>
        <Block padding={[0]}>
          <Text h3 color={textColor || colors.lightRed}>
            {text}
          </Text>
        </Block>
      </Button>
    </Block>
  );
};

export {CustomBtn};

const styles = StyleSheet.create({
  mainCon: {
    // borderWidth:1,
    elevation: 5,
    flex: 0,
    height: sizes.screenSize * 0.13,
    width: sizes.screenSize * 0.15,
    marginVertical: sizes.getWidth(3),
    marginHorizontal: sizes.getWidth(1),
  },
});
