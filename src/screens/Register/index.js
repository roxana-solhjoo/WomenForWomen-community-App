import React, {useEffect, useReducer, useState} from 'react';
import {Text, Block, TextField, Button, ActivitySign} from 'components';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, SafeAreaView, Image, ScrollView, Alert} from 'react-native';
import Modal from 'react-native-modal';
import * as EmailValidator from 'email-validator';
import { GoogleReg } from 'redux/action';

const Register = props => {
  const {navigation, route} = props;

  const REQ_FOR = 'requestFor';
  const USER = 'username';
  const EMAIL = 'email';
  const PASS = 'pass';
  const CON_PASS = 'confirm_pass';
  const PHONE = 'PH';

  const initialState = {
    requestFor: null,
    email: null,
    user: null,
    phone: null,
    password: null,
    con_pass: null,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case REQ_FOR:
        return {...state, requestFor: action.payload};
      case EMAIL:
        return {...state, email: action.payload};
      case USER:
        return {...state, user: action.payload};
      case PHONE:
        return {...state, phone: action.payload};
      case PASS:
        return {...state, password:action.payload};
      case CON_PASS:
        return {...state, con_pass: action.payload};
      default:
        return state;
    }
  };
  const dispatch = useDispatch()
  const [state, localDispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [isWaiting,setIsWaiting] = useState(false)

  useEffect(() => {
    const status = route.params.requestFor;
    setShowModal(true);
    localDispatch({type: REQ_FOR, payload: status});
  }, ['']);

  const inputHandler = ({name, text}) => {
    switch (name) {
      case USER:
        return localDispatch({type: USER, payload: text});
      case EMAIL:
        return localDispatch({type: EMAIL, payload: text});
      case PASS:
        return localDispatch({type: PASS, payload: text});
      case PHONE:
        return localDispatch({type: PHONE, payload: text});
      case CON_PASS:
        return localDispatch({type: CON_PASS, payload: text});
      case GENDER:
        return localDispatch({type: GENDER, payload: text});
      default:
        break;
    }
  };

  const goBack = () => {
    setShowModal(false), setTimeout(() => navigation.goBack(), 200);
  };
  const moveOn = () => {
    setShowModal(false),
      Alert.alert(
        'Great',
        'Purpose is to grow women empowerment & supporting them.',
        [
          {
            text: 'I Understand ! Thanks',
            // onPress:()=> setShowModal(false)
          },
        ],
      );
  };



  const submit = async() => {
    if (
      state.email !== null &&
      state.user !== null &&
      state.requestFor !== null
    ) {
      // =========================
      if (state?.password.length < 6) {
        alert('password short');
      } else {
        if (state.password === state.con_pass) {
          const validate = EmailValidator.validate(state.email)
          if(validate){
              setIsWaiting(true)
              const result =  await GoogleReg(state.email,state.password, err=> {
                alert(err),
                setIsWaiting(false)

              })
              if(result){
                // console.log("============")
                // console.log(result)
                dispatch(result)
                setIsWaiting(false)

              }
              setIsWaiting(false)

          }else{
            alert("Please Provider Correct Email Format")
          }
        } else {
          alert('Password mismatch');
        }
      }

      // =========================
    } else {
      alert('Fields are required to register');
    }
  };

  // console.log('==========');
  // console.log(state);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <Block style={{borderWidth: 0}}>
          <Block
            middle
            center
            height={sizes.getHeight(20)}
            padding={[0, sizes.getWidth(4), 0, 0]}
            style={{borderWidth: 0}}>
            <Image
              source={images.loginLogo}
              style={{resizeMode: 'contain', flex: 1}}
            />
          </Block>

          {/* TEXT FIELD */}
          <Block bottom flex={false} height={sizes.getHeight(40)}>
            <TextField
              onChangeText={inputHandler}
              name={EMAIL}
              keyboardType={'email-address'}
              placeholder="example@email.com"
              inputStyling={styles.input}
            />
            <TextField
              onChangeText={inputHandler}
              name={USER}
              placeholder="Username"
              inputStyling={styles.input}
            />
            <TextField
              onChangeText={inputHandler}
              name={PHONE}
              keyboardType={'number-pad'}
              placeholder="Phone"
              inputStyling={styles.input}
            />
            <TextField
              secure
              onChangeText={inputHandler}
              name={PASS}
              placeholder="Password"
              inputStyling={styles.input}
            />
            <TextField
              secure
              onChangeText={inputHandler}
              name={CON_PASS}
              placeholder="Please Confirm Password"
              inputStyling={styles.input}
            />
            {state.requestFor === 'Rider' && (
              <Modal
                isVisible={showModal}
                onBackButtonPress={() => setShowModal(false)}>
                <Block
                  padding={[sizes.getHeight(2)]}
                  // center
                  // middle
                  color={colors.background}
                  flex={false}
                  style={styles.popup}>
                  <Block padding={[0]} flex={3}>
                    <Text h2 color={colors.white}>
                      Rider Option is only for Women.{'\n'}Other Genders Are Not
                      Allow
                    </Text>
                  </Block>
                  <Block flex={2} row padding={[0]} space={'between'}>
                    <Button onPress={goBack} style={styles.optionBtn}>
                      <Text h3 color={colors.white}>
                        Go Back
                      </Text>
                    </Button>
                    <Button
                      onPress={moveOn}
                      style={{
                        ...styles.optionBtn,
                        backgroundColor: colors.lightRed,
                      }}>
                      <Text h3 color={colors.white}>
                        Yes Continue As Women
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </Modal>
            )}
          </Block>

          {/* Button=========================== */}
          <Block
            // flex={false}
            style={{borderWidth: 0}}
            height={sizes.getHeight(30)}
            center
            padding={[sizes.getHeight(2), 0, 0, 0]}>
            <Block
              center
              flex={false}
              middle
              style={{borderWidth: 0, width: '100%'}}>
              <Button
                onPress={submit}
                center
                middle
                style={{
                  backgroundColor: colors.lightRed,
                  width: sizes.getWidth(50),
                }}>
                <Text h3 color={colors.white}>
                  Register As {state.requestFor}
                </Text>
              </Button>
            </Block>
            <Block
              row
              padding={[sizes.getHeight(5), 0, 0, 0]}
              style={{borderWidth: 0}}>
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
            <Block row flex={false} style={{borderWidth: 0}}>
              <Block>
                <Button center middle>
                  <Text h4 color={colors.gray}>
                    Already Have An Account ?
                  </Text>
                </Button>
              </Block>
              <Block flex={4} style={{paddingHorizontal: 0}}>
                <Button
                  onPress={() => navigation.navigate('Login')}
                  center
                  middle
                  color={colors.lightRed}>
                  <Text h4 color={colors.white}>
                    Go For Login
                  </Text>
                </Button>
              </Block>
            </Block>
            {/* -----------------------------ALREADY */}
          </Block>
        </Block>
      </ScrollView>
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
    padding: 0,
    width: '100%',
    height: sizes.getHeight(20),
    borderRadius: sizes.getWidth(2),
  },
  optionBtn: {
    backgroundColor: colors.gray,
    width: sizes.getWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Register};
