import React from 'react';
import {Block, Text, Button} from 'components';
import {StyleSheet, Image} from 'react-native';
import {sizes, colors} from 'styles/theme';
import * as images from 'assets/images';
import * as icons from 'assets/icons';

const DataCard = () => {
  return (
    <Block
      padding={[sizes.withScreen(0.005)]}
      row
      flex={false}
      style={styles.cardCon}>
      <Block flex={false} center middle width={'30%'}>
        <Image
          source={images.dummyShirt}
          style={{resizeMode: 'contain', flex: 1}}
        />
      </Block>
      <Block flex={false} width={'60%'} style={{borderWidth: 0}}>
        <Block padding={[sizes.getHeight(1), 0, 0, 0]} flex={4}>
          <Text h3 bold style={{lineHeight: sizes.getHeight(2)}}>
            T-Shirt
          </Text>
          <Text h4>It's a hot item and still in trending in the market</Text>
          <Text h4 color={colors.lightRed}>
            25.99 $ (for now)
          </Text>
        </Block>
        <Block>
          <Text h4 color={'green'}>
            Up To 35% OFF
          </Text>
        </Block>
      </Block>

      <Block flex={false} middle center style={{borderWidth: 0, width: '10%'}}>
        <Button
          center
          middle
          style={{width: '100%', height: '100%', borderWidth: 0}}>
          <Image
            source={icons.emptedHeart}
            style={{resizeMode: 'contain', flex: 0.3}}
          />
        </Button>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  cardCon: {
    // borderWidth: 1,
    height: sizes.getHeight(18),
    width: '100%',
    borderRadius: sizes.getWidth(0.9),
    marginVertical: sizes.getWidth(2),
    backgroundColor: colors.white,
    elevation: 2,
  },
});

export {DataCard};
