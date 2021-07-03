import React from 'react';
import {Block, Text} from 'components';
import {TextInput, Image} from 'react-native';
import {sizes, colors} from 'styles/theme';

export const CustomInput = props => {
  const {
    source,
    placeholder,
    placeholderColor,
    width,
    numeric,
    noRounded,
    noIcon,
    bb,bc,
    bw,
    textarea,
    height,
    numberOfLine,
    pv,ph,
    imgStyling
  } = props;
  return (
    <Block
      center
      flex={false}
      padding={[pv?pv:0,ph?ph:0]}
      row
      style={{
        borderWidth: bw && 1,
        borderBottomWidth: bb && 1,
        borderColor: bc ? bc:colors.customRed,
        width: width || '100%',
        height: height || sizes.getHeight(5.3),
        borderRadius: !noRounded ? sizes.withScreen(0.1) : 0,
      }}>
      {!noIcon && (
        <Image
          source={source}
          style={{
            resizeMode: 'contain',
            height: sizes.getHeight(2.5),
            width: sizes.getWidth(8),
            ...imgStyling
          }}
        />
      )}
      {/* <TextInput
      numberOfLines={numberOfLine}
        multiline={textarea && true}
        keyboardType={numeric && 'number-pad'}
        placeholderTextColor={placeholderColor}
        placeholder={placeholder}
        style={{
          justifyContent:'flex-start',
          textAlignVertical:'top',
          borderBottomColor: 'red',
          width: '90%',
          color: colors.customRed,
        }}
      /> */}

      <TextInput
        numberOfLines={numberOfLine}
        multiline={textarea && true}
        keyboardType={numeric && 'number-pad'}
        placeholderTextColor={placeholderColor}
        placeholder={placeholder}
        style={{
          textAlignVertical : "top",
          // paddingBottom:20,
          paddingTop: 10,
          alignContent:'flex-start',
          alignSelf:'flex-start',
          justifyContent: 'flex-start',
          textAlignVertical: 'top',
          borderBottomColor: 'red',
          width: '90%',
          color: colors.customRed,
        }}
      />
    </Block>
  );
};
