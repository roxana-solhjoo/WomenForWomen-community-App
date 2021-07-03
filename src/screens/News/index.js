import React from 'react';
import {StyleSheet, Image, ScrollView} from 'react-native';
import {Block, Text, Button} from 'components';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {sizes, color, colors} from 'styles/theme';
import {useSelector, useDispatch} from 'react-redux';
import NewsCard from './Section/NewsCard';

const News = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  return (
    <Block
      // padding={[sizes.getHeight(3),sizes.getWidth(3)]}

      color={colors.background}>
      {/* <Block style={styles.newsCon}>
        <Image source={images.news} style={styles.news} />
      </Block> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <NewsCard navigation={navigation} />
        <NewsCard navigation={navigation} />
        <NewsCard navigation={navigation} />
        <NewsCard navigation={navigation} />
        <NewsCard navigation={navigation} />
        <NewsCard navigation={navigation} />
        <NewsCard navigation={navigation} />
      </ScrollView>
    </Block>
  );
};

export {News};

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
    padding: 0,
    borderRadius: sizes.getWidth(3),
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
