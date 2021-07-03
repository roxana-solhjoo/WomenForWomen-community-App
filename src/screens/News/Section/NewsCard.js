import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Block, Text, Button} from 'components';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {sizes, color, colors} from 'styles/theme';
import {useSelector, useDispatch} from 'react-redux';

const NewsCard = props => {
  const {navigation}= props
  return (
    <Block
      space={'between'}
      row
      flex={false}
      style={{...styles.cardCon}}>
      <Block middle center flex={false} style={styles.imgCon}>
        <Image
          source={images.newsImg}
          style={{resizeMode: 'contain', width: sizes.getWidth(22)}}
        />
      </Block>
      <Block
        padding={[sizes.getHeight(3), 0, 0, 0]}
        flex={false}
        style={styles.detailCon}>
        <Text h2>New York City Title </Text>
        <Text h4>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </Text>
      </Block>

      <Block middle padding={[0]} flex={false} style={{width: '11%'}}>
        <Button
          onPress={()=> navigation.navigate('NewsDetail')}
          middle
          center
          opacity={0.5}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 0,
            borderRightTopRadius: sizes.getWidth(3),
            borderRightBottomRadius: sizes.getWidth(3),
            backgroundColor: colors.lightRed,
          }}>
          <Image
            source={icons.go}
            style={{
              resizeMode: 'contain',
              width: sizes.getWidth(5),
              tintColor: colors.white,
            }}
          />
        </Button>
      </Block>
    </Block>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  newsCon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  news: {
    // resizeMode:'contain',
    flex: 0.1,
  },
  cardCon: {
    height: sizes.getHeight(17),
    backgroundColor: colors.white,
    // borderWidth: 1,
    marginVertical: sizes.getHeight(0.8),

    // borderRadius: sizes.getWidth(3),
    borderTopLeftRadius: sizes.getWidth(3),
  },
  imgCon: {
    width: sizes.getWidth(30),
    // borderWidth: 1,
  },
  detailCon: {
    width: sizes.getWidth(55),
    // borderWidth: 1,
  },
});
