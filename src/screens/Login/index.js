import React, {useState} from 'react';
import {Text, Block, Button, TextField, ActivitySign} from 'components';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as EmailValidator from 'email-validator';
import {GoogleLogin, SaveUserInfo} from 'redux/action';
import Modal from 'react-native-modal';
import database from '@react-native-firebase/database';

const Login = props => {
  const {navigation, route} = props;
  const EMAIL = 'EMAIL';
  const PASS = 'PASS';
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {user} = useSelector(state => state.auth);
  // console.log(user)
  // ==========Functions============
  const registration = () => {
    setShowModal(true);
  };

  const inputHandler = ({name, text}) => {
    switch (name) {
      case EMAIL:
        // const validate = EmailValidator.validate(text)
        return setEmail(text);
      case PASS:
        return setPass(text);
      default:
        return console.log('default');
    }
  };
  const dispatch = useDispatch();
  const submitHandler = async () => {
    if (email && pass) {
      const validate = EmailValidator.validate(email);
      if (validate) {
        if (pass.length >= 6) {
          setIsWaiting(true);
          const result = await GoogleLogin(email, pass, err => {
            alert(err), setIsWaiting(false);
          });
          if (result) {
            console.log('result.payload');
            console.log(result.payload);
            const fb = await SaveUserInfo(
              result.payload.email,
              result.payload.uid,
              err => {
                alert(err);
              }
            )
            if (fb) {
              dispatch(result);
              setIsWaiting(false);
            } else {
              console.log('No Firebase');
              setIsWaiting(false);
            }
            navigation.navigate('App', {screen: 'Home'});
          }
        } else {
          alert('Password length must be 8 characters');
        }
      } else {
        alert('Please Type a correct Email Format');
      }
    } else {
      alert('Required Field needs to be filled');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Block middle color={colors.background}>
        <Block
          middle
          center
          flex={false}
          height={sizes.getHeight(20)}
          padding={[0, sizes.getWidth(4), 0, 0]}>
          <Image
            source={images.loginLogo}
            style={{resizeMode: 'contain', flex: 1}}
          />
        </Block>

        {/* TEXT FIELD */}
        <Block bottom flex={false} height={sizes.getHeight(20)}>
          <TextField
            onChangeText={inputHandler}
            name={EMAIL}
            placeholder="example@email.com"
            inputStyling={styles.input}
          />
          <TextField
            secure
            onChangeText={inputHandler}
            name={PASS}
            placeholder="Password"
            inputStyling={styles.input}
          />
        </Block>

        {/* Button */}
        <Block
          flex={false}
          height={sizes.getHeight(40)}
          center
          padding={[sizes.getHeight(2), 0, 0, 0]}>
          <Block
            center
            flex={false}
            middle
            style={{borderWidth: 0, width: '100%'}}>
            <Button
              onPress={submitHandler}
              center
              middle
              style={{
                backgroundColor: colors.lightRed,
                width: sizes.getWidth(50),
              }}>
              <Text h3 color={colors.white}>
                Login
              </Text>
            </Button>
          </Block>
          <Block
            row
            flex={false}
            center
            // padding={[sizes.getHeight(5), 0, 0, 0]}
            style={{borderWidth: 0, height: sizes.getHeight(10)}}>
            <Block>
              <Button
                activeOpactiy={0.2}
                center
                middle
                style={styles.socialStyle}>
                <Text h3 color={colors.red}>
                  FaceBook
                </Text>
              </Button>
            </Block>

            <Block>
              <Button
                activeOpactiy={0.2}
                center
                middle
                style={styles.socialStyle}>
                <Text h3 color={colors.red}>
                  Google
                </Text>
              </Button>
            </Block>
          </Block>
          {/* -----------------------------ALREADY */}
          <Block flex={false} style={{borderWidth: 0, width: '100%'}}>
            <Button
              onPress={registration}
              center
              middle
              color={colors.lightRed}>
              <Text h4 color={colors.white}>
                Sign Up
              </Text>
            </Button>
          </Block>
        </Block>
        {/* -----------------------------ALREADY */}
      </Block>
      {/* ================================ */}
      <Modal
        isVisible={showModal}
        onBackButtonPress={() => setShowModal(false)}
        animationIn="bounceIn">
        <Block
          flex={false}
          center
          middle
          color={colors.background}
          height={sizes.getHeight(20)}
          style={{borderRadius: sizes.getWidth(1)}}>
          <Button
            onPress={() => (
              setShowModal(false),
              navigation.navigate('Register', {requestFor: 'Normal'})
            )}
            style={styles.regBtn}
            opacity={0.3}>
            <Text h2 color={colors.red}>
              Normal User
            </Text>
          </Button>

          <Button
            onPress={() => (
              setShowModal(false),
              navigation.navigate('Register', {requestFor: 'Rider'})
            )}
            style={styles.regBtn}
            opacity={0.3}>
            <Text h2 color={colors.red}>
              Rider
            </Text>
          </Button>
        </Block>
      </Modal>
      {/* ================================ */}
      {isWaiting && <ActivitySign />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socialStyle: {
    borderWidth: 0.1,
    // borderStyle: 'dashed',
    borderColor: colors.red,
    width: '100%',
    backgroundColor: '#EFEFEF',
  },
  input: {
    borderBottomColor: colors.red,
    borderBottomWidth: 1,
    width: '100%',
    color: colors.gray,
  },
  popup: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  regBtn: {
    borderWidth: 0.4,
    borderColor: colors.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
    width: sizes.getWidth(40),
  },
});

export {Login};





