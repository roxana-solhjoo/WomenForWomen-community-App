import React from 'react';
import {Text, Block, DataCard, Slider} from 'components';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

const Favorite = props => {
  const {navigation, route} = props;
  const data = ['1', '1', '1'];
  return (
    <Block padding={[0]} color={colors.background}>
      <ScrollView style={{flex: 1, paddingHorizontal:sizes.getWidth(3)}}>
        {data.map((item, index) => {
          return <DataCard key={index} />;
        })}
      </ScrollView>
    </Block>
  );
};

export {Favorite};
