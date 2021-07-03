import React from 'react';
import Block from './Block';
import Text from './Text';
import {theme} from 'styles';

const SimpleToast = ({text}) => {
  return (
    <Block
      flex={false}
      center
      middle
      style={{width: 300, height: 50, borderRadius: 10}}
      color={theme.colors.gray + 66}>
      <Text>{text}</Text>
    </Block>
  );
};
export default SimpleToast;
