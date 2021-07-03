import React from 'react';
import {StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Home} from 'screens/Home';
import { Block, Text } from 'components';
import { colors } from 'styles/theme';

const Intro = props => {
    const {navigation,route} = props
    const slides = [
        {
          key: 1,
          title: 'Title 1',
          text: 'Welcome To The Store',
          short : 'The Cool stuff is about to begin moreover the stuff \n and card facility are available',
        //   image: require('./assets/1.jpg'),
        //   backgroundColor: '#59b2ab',
          backgroundColor: '#22bcc9',
        //   backgroundColor: colors.red,
        },
        {
          key: 2,
          title: 'Title 2',
          text: 'Your Are Now About To Reach',
          short : 'The Cool stuff is about to begin',
        //   image: require('./assets/2.jpg'),
        //   backgroundColor: '#febe29',
          backgroundColor: colors.lightRed,

        },
        {
          key: 3,
          title: 'Rocket guy',
          text: 'One More Step to Go',
          short : 'The Cool stuff is about to begin',
        //   image: require('./assets/3.jpg'),
        //   backgroundColor: '#22bcb5',
          backgroundColor: colors.red,

        }
      ];
  const _renderItem = ({item}) => {
    return (
      <Block center middle color={item.backgroundColor}>
          <Text header color={colors.white}>{item.text}</Text>
          <Text h4 color={colors.white} style={{textAlign:'center'}}>{item.short}</Text>
      </Block>
    );
  };

  const done = () => {
    navigation.navigate('Login')
    // alert('1')
  }
  return <AppIntroSlider  onDone={done} renderItem={_renderItem} data={slides} />;
};

export default Intro;

const styles = StyleSheet.create({});
