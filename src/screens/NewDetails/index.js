import React, {Component} from 'react';
import {Block, Text} from 'components';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Image} from 'react-native';
import {colors, sizes} from 'styles/theme';
// import {Background} from 'screens/Coupons/Section/background';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {StarInformation} from './Section/StarInformation';

const NewDetails = props => {
  return (
    <Block>
      <ScrollView style={{flex: 1}}>
        <Block flex={false} center middle style={styles.background}>
          <Image source={images.news} />
        </Block>

        {/* Coupon Offer */}
        <Block flex={false} style={styles.coupon}>
          {/* ---------------LOGO------ */}
          <Block center flex={false} style={styles.logoCon}>
            <Block
              color={'transparent'}
              padding={[0]}
              flex={false}
              middle
              style={styles.logoImgCon}>
              {/* <Background opacity={0.6} size={sizes.screenSize * 0.09} /> */}
            </Block>
          </Block>
          {/* ------------------------- */}
          <Block
            flex={false}
            style={{borderWidth: 0, height: sizes.getHeight(30)}}>
            <Block flex={false} padding={[0, sizes.getWidth(2)]} bottom>
              <Text h4 bold>
                Headlines
              </Text>
            </Block>
            <Block center middle flex={4} style={{borderWidth: 0}}>
              <Image
                source={icons.dummyCoupon}
                style={{resizeMode: 'contain', width: sizes.getWidth(65)}}
              />
            </Block>
          </Block>
        </Block>
        {/* Coupons Details */}
        <Block
          flex={false}
          color={colors.lightgray}
          height={sizes.getHeight(2)}
          margin={[sizes.getHeight(5), 0, 0, 0]}
        />
        <StarInformation />
        <StarInformation />

        
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  background: {
    height: sizes.getHeight(25),
    // borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    overflow: 'hidden'
  },
  coupon: {
    height: sizes.getHeight(10),
    borderBottomWidth: 0.3,
  },
  logoCon: {
    // borderWidth:1,
    height: sizes.getHeight(15),
  },
  logoImgCon: {
    position: 'absolute',
    // borderWidth:1,
    top: sizes.getHeight(-9),
  },
});

export {NewDetails};
