import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, PermissionsAndroid} from 'react-native';
import {Text, Block, Button} from 'components';
import {sizes, colors} from 'styles/theme';
import {CustomBtn} from './buttons';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from 'redux/constants';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';

// =====================================================FUNCS

const Dashboard = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const {uid} = useSelector(state => state.auth.user);

  const dbUserInfo = database().ref('/User-Information');
  // =====================================================
  const COORDS = 'COORDS';
  // =====================================================
  const [currentLocation, setCurrentLocation] = useState({});
  // =====================================================




  useEffect(() => {
    updateLocation();
    
  },['']);

  useEffect(() => {
    dbUserInfo.once('value', data =>{
      updateLocation()
    })
  },['']);
  const updateLocation = async () => {
    try {
      let check = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('CHECK RESULT');
      console.log(check);

      // ------Condition
      if (!check) {
        //if user doest not allow before then ask for permission
        let granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('CURRENT PERMISSION');
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await Geolocation.getCurrentPosition(
            ({coords}) => {
              setCurrentLocation(coords);
              database()
                .ref('/User-Information')
                .child(`${uid}/location`)
                .set({lat: coords.latitude, lng: coords.longitude});
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
          console.log('Allowed');
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          alert('Go Application Setting for enable location');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('HERE IN NEVER ASK AGAIN');
          console.log(granted);
          alert('Go Application Setting to allow location');
        }
      } else {
        // *********if user allowed the npick up location from DB*********
        console.log('****');
        await dbUserInfo.once('value', data => {
          data.forEach(dbEl => {
              // console.log("============================")
              // console.log(dbEl.val().userInfo.uid === uid)
            if (dbEl.val().userInfo.uid === uid) {
              console.log("============================")
              console.log(dbEl.val().userInfo)
              if (!dbEl.val().location) {
                console.log('USER HAVE NO LOCATION PARAMETTER PERSIST IN DB');
                Geolocation.getCurrentPosition(
                  async ({coords}) => {
                    console.log("SETTING CURRENT LOCATION OF USER ")
                    console.log(coords)
                    setCurrentLocation(coords);
                    database()
                      .ref('/User-Information')
                      .child(`${uid}/location`)
                      .set({lat: coords.latitude, lng: coords.longitude});
                  },
                  error => {
                    console.log(error.code, error.message);
                  },
                  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
                );
              } else {
                console.log('User Db location params are going to send forward');
                console.log(dbEl.val().location)
                setCurrentLocation(dbEl.val().location)
              }
            }
          });
        });
      }
    } catch (error) {
      console.log('error here i am');
      console.log(error);
    }
  };
  // ============================================================


  // console.log('currentLocation');
  // console.log(currentLocation);
  return (
    <Block padding={[0]} middle center color={colors.background}>
      <Block style={styles.background}>
        <Image source={images.background} style={styles.bcImg} />
      </Block>
      <Block flex={false} crossRight row center>
        <CustomBtn
          onPress={() =>
            navigation.navigate('GetRide', {current: currentLocation})
          }
          text={'For Ride'}
          textColor={'orange'}
          image={icons.getRide}
          size={sizes.getWidth(20)}
        />
        <CustomBtn
          onPress={() => navigation.navigate('Message')}
          text={'Start Chat'}
          textColor={'#35b321'}
          image={icons.chat}
          size={sizes.getWidth(18)}
        />
      </Block>

      <Block padding={[0]} flex={false} crossLeft row center>
        <CustomBtn
          onPress={() => navigation.navigate('Community')}
          text={'Find A Community'}
          textColor={'purple'}
          image={icons.community}
        />
        <CustomBtn
          onPress={() => navigation.navigate('News')}
          text={'News'}
          textColor={'orange'}
          image={icons.news}
          size={sizes.getWidth(22)}
        />
      </Block>
      <Block padding={[0]} flex={false} style={styles.logout}>
        <Button
        onPress={() => dispatch({type: LOGOUT})}
          center
          middle
          style={styles.logoutBtn}>
          <Text> Logout</Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: sizes.getHeight(100),
  },
  bcImg: {
    resizeMode: 'cover',
    height: '100%',
  },
  logout: {
    position: 'absolute',
    width: sizes.getWidth(78),
    height: sizes.getHeight(7),
    // backgroundColor:'#F0F0F099',
    bottom: sizes.getHeight(1),
    padding: 0,
  },
  logoutBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F099',
    margin: 0,
    padding: 0,
  },
});
