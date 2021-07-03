import React from 'react';
import {Button} from 'components';
import {sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import {Image} from 'react-native';

const ChatButton = props => {
  // console.log(navigation)
  return (
    <Button
      center
      middle
      style={{
        position: 'absolute',
        height: sizes.getHeight(7),
        width: sizes.getWidth(15),
        bottom: sizes.getHeight(3),
        right: sizes.getWidth(5),
      }}
      {...props}>
      <Image
        source={icons.chat}
        style={{resizeMode: 'contain', width: sizes.getWidth(15)}}
      />
    </Button>
  );
};

export default ChatButton;
