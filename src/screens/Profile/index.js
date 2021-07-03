import React from 'react';
import {Text, Block, Button} from 'components';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {useDispatch, useSelector} from 'react-redux';
import InfoTab from './Section/infoTab';
import {ScrollView} from 'react-native';

const Profile = props => {
  const {navigation, route} = props;

  return (
    <Block padding={[0]} color={colors.background}>
      <Block flex={2} center middle style={{borderWidth: 0}}>
        <Block
          flex={false}
          style={{
            borderWidth: 0.4,
            borderColor: colors.lightRed,
            borderRadius: sizes.getWidth(50),
            height: sizes.screenSize * 0.1,
            width: sizes.screenSize * 0.1,
          }}
        />
        <Block
          middle
          center
          margin={[sizes.getHeight(2), 0, 0, 0]}
          flex={false}>
          <Text h2 bold color={colors.gray2}>
            JOHN DOE
          </Text>
          <Block
            center
            middle
            flex={false}
            color={'green'}
            height={sizes.getHeight(4)}
            margin={[sizes.getHeight(1), 0, 0, 0]}
            style={{borderRadius: sizes.getWidth(0.7)}}>
            <Text bold h4 color={colors.white}>
              $445.32
            </Text>
          </Block>
        </Block>
      </Block>

      <Block middle flex={2} padding={[sizes.getHeight(1)]}>
        <ScrollView>
          <InfoTab heading="user" details="Marcos" />
          <InfoTab heading="email" details="john@doe.com" />
          <InfoTab heading="Phone" details="+96-888-212121" />
          <InfoTab heading="Region" details="Saudi Arabia" />
          <InfoTab heading="Payment" details="Payment With Card" />
          <InfoTab heading="Payment" details="Payment With Card" />
          <InfoTab heading="Payment" details="Payment With Card" />
        </ScrollView>
      </Block>

      <Block
        middle
        margin={[0, 0, sizes.getHeight(2), 0]}
        flex={false}
        height={sizes.getHeight(6)}
        style={{borderRadius: sizes.getWidth(0.7)}}
        color={colors.gray3}>
        <Button center middle style={{width: '100%', height: '100%'}}>
          <Text color={colors.white}>Logout</Text>
        </Button>
      </Block>
    </Block>
  );
};

export {Profile};
