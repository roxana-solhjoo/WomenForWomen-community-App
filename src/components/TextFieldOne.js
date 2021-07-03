import React, { useRef } from 'react';
import {TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import {Block} from 'components';
import {theme} from 'styles';
import {Image} from 'react-native';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';

const TextFieldOne = React.forwardRef((props,ref) => {
  const {placeholder, icon,name, isWaiting, onChangeText, value} = props;
  return (
    <Block
      color={theme.colors.gray4}
      flex={false}
      center
      middle
      row
      // padding={[0, theme.sizes.padding, 0, theme.sizes.padding]}
      style={styles.container}>
      <TextInput
        {...props}
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        style={(styles.textInput, props.inputStyling)}
        onChangeText={text => onChangeText({name, text})}
        value={value}
      />
      {icon && (
        <Image
          source={icon}
          style={{
            marginHorizontal: theme.sizes.border,
            position: 'absolute',
            right: 0,
            resizeMode: 'contain',
            width: sizes.getWidth(4),
            tintColor:
              (icon === icons.warning && colors.customRed) ||
              (icon === icons.tic && 'green') ||
              'black',
          }}
        />
      )}
      {isWaiting && (
        <ActivityIndicator
          size="small"
          color={colors.customRed}
          style={{position: 'absolute', right: 0}}
        />
      )}
    </Block>
  );
})

export {TextFieldOne};

const styles = StyleSheet.create({
  container: {
    // height: sizes.getHeight(8),
    width: '100%',
    // borderWidth:1,
    borderRadius: theme.sizes.border,
    // justifyContent:'flex-end'
    // marginVertical: theme.sizes.padding,
  },
  textInput: {
    color: theme.colors.gray5,
    width: '100%',
    // placeholderTextColor:colors.darkBrown
    ...theme.fonts.h1,
  },
});
