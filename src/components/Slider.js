import React from 'react';
import {Block, Text} from 'components';
import * as images from 'assets/images';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import {Image} from 'react-native';

const Slider = () => {
  return (
    <Block
      padding={[0]}
      center
      middle
      flex={false}
      style={{height: sizes.getHeight(27), overflow: 'hidden'}}>
      <Image source={images.store} style={{resizeMode: 'stretch', flex: 0.9}} />
    </Block>
  );
};

export {Slider};
