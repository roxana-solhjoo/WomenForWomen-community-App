import React from 'react';

import {Block, Text} from 'components';
import {sizes, colors} from 'styles/theme';

const InfoTab = props => {
  const {heading, details} = props;
  return (
    <Block
    padding={[0]}
        row
      margin={[sizes.getHeight(1), 0]}
      middle
      flex={false}
      height={sizes.getHeight(6)}
      style={{borderRadius: sizes.getWidth(0.7)}}
      color={colors.gray5}>
      <Block middle style={{borderWidth:1}} color={colors.gray} style={{borderRadius:sizes.getWidth(0.7)}}>
        <Text h3 color={colors.white} style={{textTransform: 'capitalize'}}>
          {heading}
        </Text>
      </Block>

      <Block middle flex={5}>
      <Text h3 color={colors.gray} style={{textTransform: 'capitalize'}}>
           {details}
          </Text>
      </Block>
    </Block>
  );
};

export default InfoTab;
