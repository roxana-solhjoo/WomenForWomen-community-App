import React from 'react';
import {Block, Text, Button} from 'components';
import {StyleSheet} from 'react-native';
import {sizes, colors} from 'styles/theme';

const BigButton = props => {
  const {children, width, textColor, textSize,textStyle, btnStyle} = props;
  return (
    <Button
        activeOpacity={0.4}
      {...props}
      center
      middle
      style={{...styles.bbStyle, width: width || '100%', ...btnStyle}}>
      <Text
        style={{
          color: textColor || props.color ? colors.white : colors.black,...textStyle,
          fontSize:textSize || sizes.h3
        }}>
        {children}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  bbStyle: {
    // borderWidth:1,
    flex: 0,
    height: sizes.getHeight(6.5),
  },
});

export {BigButton};
