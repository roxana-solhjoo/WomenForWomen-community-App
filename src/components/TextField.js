import React from 'react';
import {TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import {Block} from 'components';
import {theme} from 'styles';
import {Image} from 'react-native';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';

const TextField = props => {
  const {placeholder, icon,name, isWaiting, onChangeText, value,secure} = props;
  return (
    <Block
      color={theme.colors.gray4}
      flex={false}
      center
      // middle
      row
      // padding={[0, theme.sizes.padding, 0, theme.sizes.padding]}
      style={styles.container,props.conStyling}>
      <TextInput
        secureTextEntry={secure || false}
        // keyboardType={"email-address"}
        {...props}
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
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    // height: sizes.getHeight(8),
    width: '100%',
    paddingHorizontal:0,
    // borderWidth:1,
    borderBottomWidth:1,
    borderBottomColor:colors.gray,
    // borderRadius: theme.sizes.border,
    // justifyContent:'flex-end'
    // marginVertical: theme.sizes.padding,
  },
  textInput: {
    // color: theme.colors.lightRed,
    width: '100%',
    justifyContent:'flex-start',
    // placeholderTextColor:colors.darkBrown
    ...theme.fonts.h1,
  },
});
