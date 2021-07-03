import React from 'react';
import {Block, Text} from 'components';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {colors, sizes} from 'styles/theme';

const ActivitySign = props => {
  return (
    <Block center middle style={styles.holder}>
      <Block
        flex={false}
        center
        middle
        style={{
          backgroundColor: colors.white,
          height: sizes.getDimensions.height * 0.15,
          width:sizes.getDimensions.width*0.3,
          borderRadius:sizes.withScreen(0.004),
          elevation:10,
        }}>
        <ActivityIndicator
          size={props.size || `large`}
          color={colors.lightRed}
          // style={{marginBottom: 20}}
        />
        <Text h4 color={colors.lightRed} style={{backgroundColor: 'white'}}>
            Please Wait...
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  holder: {
    position: 'absolute',
    bottom: 0,
    // top:0,
    // height: sizes.getDimensions.height,
    height: '100%',
    width: sizes.getDimensions.width,
    zIndex: 10,
    // backgroundColor: 'red',
  },
});

export default ActivitySign;
