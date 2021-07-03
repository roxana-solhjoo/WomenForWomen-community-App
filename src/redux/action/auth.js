import {SAVE_USER_INFO, REG_USER} from 'redux/constants';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { PermissionsAndroid } from 'react-native';

const googleLogin = response => {
  return {type: SAVE_USER_INFO, payload: response};
};

const googleReg = response => {
  return {type: REG_USER, payload: response};
};

// ======================ASYNC FUNC=========================
  

// GET LOCATION AND PERMISSIONS  
export const LocationWithPermissions = async (setCollectionName,keyNameInCollection,onError) => {
    // // await Geolocation.getCurrentPosition(info=> console.log(info))
    // const COORDS ="COORDS"
    // try {
    //   let check = await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );

    //   // ------Condition
    //   if (!check) {
    //     let granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     );
    //     console.log('granted');
    //     console.log(granted);
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       await Geolocation.getCurrentPosition(
    //         ({coords}) => {
    //           database()
    //           .ref(`/${setCollectionName}`)
    //           .child(`${keyNameInCollection}`)
    //           .update({
    //             location: {lat: coords.latitude, lng: coords.longitude},
    //           });
    //           // return localDispatch({type: COORDS, payload: coords});
    //           return {type: COORDS, payload: coords}
    //         },
    //         error => {
    //           // console.log(error.code, error.message);
    //           onError(error)
    //         },
    //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //       );
    //       // console.log('Allowed');
    //     } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
    //       // alert('Go Application Setting for enable location');
    //       onError("Permission Denied")
    //     } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //       // console.log('HERE IN NEVER ASK AGAIN');
    //       onError("Permission never ask again")
    //       // console.log(granted);
    //       // alert('Go Application Setting to allow location');
    //     }
    //   }
    // } catch (error) {
    //   console.log('error');
    //   console.log(error);
    // }
     
  };
  // ============================================================








export const GoogleLogin = async (email, pass, onError) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, pass);
    console.log('FIREBASE RESPONSE')
    console.log(response)
    return googleLogin(response.user._user);
  } catch (error) {
    console.log('error');
    console.log(error);
    onError(error);
  }

  const response = await auth().signInWithEmailAndPassword('a@a.com','aaaaaa');
  console.log('**************')
  console.log(response)

  return true
};

export const GoogleReg = async (email, pass, onError) => {
  // console.log("===========")
  // console.log(email)
  // console.log(pass)
  try {
    const response = await auth().createUserWithEmailAndPassword(email, pass);
    console.log('======API RESPONSE=====');
    console.log(response)
    return googleReg(response.user._user);
  } catch (error) {
    console.log('error');
    console.log(error);
    onError(error);
  }
};

// get userLocation
export const SaveUserInfo = async (email,uid,onError) => {
  // console.log(uid)
  try {
    const response = await database().ref("/User-Information").child(`${uid}/userInfo`).set({email:email, uid:uid})
    console.log('response')
    console.log(response)
    return true
  } catch (e) {
    console.log('fetching Error');
    console.log(e);
  }

  // const data = await database().ref("/user").child('1').set({name:'1', uid:'1'})
  // console.log(data)
};
