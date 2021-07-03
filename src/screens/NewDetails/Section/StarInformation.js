import React from 'react';
import {Block, Text} from 'components';
import {sizes, colors} from 'styles/theme';

const StarInformation = () => {
  return (
    <Block
      flex={false}
      padding={[sizes.getHeight(2)]}
      height={sizes.getHeight(50)}
      style={{borderWidth: 0}}>
      {/* About */}
      <Block padding={[sizes.getHeight(2)]} color={colors.gray3} flex={false} margin={[sizes.getHeight(1), 0]}>
        <Text h2 color={colors.white} style={{fontWeight: '900', marginBottom: sizes.getHeight(1)}}>
          News About
        </Text>
        <Text h4 color={colors.white}>
          Starbucks Corporation is an American multinational chain of
          coffeehouses and roastery reserves headquartered in Seattle,
          Washington. As the largest coffeehouse in the world, Starbucks is seen
          to be the main representation of the United States' second wave of
          coffee culture.
        </Text>
      </Block>
      {/* location */}
      <Block padding={[sizes.getWidth(2)]} color={colors.lightRed} flex={false} margin={[sizes.getHeight(1), 0]}>
        <Text h2 style={{fontWeight: '900'}}>
          Location
        </Text>
        <Text h4 color={colors.black}>
          314 Carmela Lodge John Doe
        </Text>
      </Block>
      {/* contact */}
      <Block padding={[sizes.getWidth(2)]} color={colors.gray3}  margin={[sizes.getHeight(1), 0]} style={{borderWidth:0}}>
        <Text h2 color={colors.white} style={{fontWeight: '900'}}>
          Contact
        </Text>

        <Block flex={false} row>
          <Text h4 color={colors.white}>
            Email :{' '}
          </Text>
          <Text h4 color={colors.white}>
             314 Carmela Lodge
          </Text>
        </Block>
        <Block flex={false} center row>
          <Text h4 color={colors.white}>
            Phone :{' '}
          </Text>
          <Text h4 color={colors.white}>
            +09660-1234512121
          </Text>
        </Block>

        
      </Block>
      
    </Block>
  );
};

export {StarInformation};
