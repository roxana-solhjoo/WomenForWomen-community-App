import React, {useEffect, useReducer, useState} from 'react';
import {StyleSheet, Image, PermissionsAndroid, Alert} from 'react-native';
import {Block, Text, TextField, Button} from 'components';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {sizes, color, colors} from 'styles/theme';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  MarkerAnimated,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import {LocationWithPermissions} from 'redux/action';

const GetRide = props => {
  // =====================================================
  const dispatch = useDispatch();
  const {uid, email} = useSelector(state => state.auth.user);
  // =====================================================
  const {navigation, route} = props;
  const ZOOM = 'CHANGE_ZOOM';
  const COORDS = 'COORDS';
  const CURRENT_COORD = 'CURRENT_COORD';
  const MARKER_DRAG = 'CURRENT_LOCATION_ON_MARKET_DRAGGED';
  const DB_LOCATION = 'DB_LOCATION';
  const SHOW_RIDES = 'SHOW_RIDES';
  // =====================================================
  const dbUserInfo = database().ref('/User-Information');
  // =====================================================
  // const destination = {latitude: 37.771707, longitude: -122.4053769};
  const initialState = {
    coords: {
      lat: 37.78825,
      lng: -122.4324,
    },
    zoom: 9,
    allRides: [],
  };
  // =====================================================
  const [refreshBackground, setRefreshBackground] = useState(null);
  useEffect(() => {
    console.log('Location is changed');
    console.log(route?.params.current);
    localDispatch({type: COORDS, payload: route?.params.current});
  }, [route?.params.current.latitude, route?.params.current.longitude]);
  // =====================================================

  const reducer = (state, action) => {
    switch (action.type) {
      case ZOOM:
        // console.log(action.payload)
        return {...state, zoom: action.payload};
      case COORDS:
        return {...state, coords: action.payload};
      case MARKER_DRAG:
        // console.log('MARKER GRAGGED===');
        // console.log(action.payload);
        return {
          ...state,
          coords: {lat: action.payload.latitude, lng: action.payload.longitude},
        };
      case CURRENT_COORD:
        console.log('=====');
        console.log(action.payload);
        return {...state};
      case SHOW_RIDES:
        console.log('=====SHOW RIDES');
        console.log(action.payload);
        return {...state, allRides: [...state.allRides, action.payload]};
      default:
        return state;
    }
  };
  const [state, localDispatch] = useReducer(reducer, initialState);

  const showRides = async () => {
    localDispatch({type: ZOOM, payload: 12});

    await dbUserInfo.on('value', data => {
      data.forEach(dbRides => {
        if (dbRides.val().userInfo.uid !== uid) {
          //will show other persons only
          // console.log(dbRides.val())
          if (state.allRides.length > 0) {
            console.log('already available');
            console.log(state.allRides);
            state.allRides.forEach(rides => {
              // console.log(rides)
              if (rides.userInfo.uid === dbRides.val().userInfo.uid) {
                console.log('******user is already in state*****');
                
              } else {
                console.log(
                  'check if user not persist in state then go and add user in state or new user add which is not show here',
                );
                // localDispatch({type: SHOW_RIDES, payload: dbRides.val()});
                // localDispatch({type: SHOW_RIDES, payload: [...state.allRides,dbRides.val()]});
              }
            });
          } else {
            console.log('add pleaes');
            console.log(dbRides.val());
            // localDispatch({type: SHOW_RIDES, payload: [...state.allRides,dbRides.val()]});
            localDispatch({type: SHOW_RIDES, payload: dbRides.val()});
          }
        }
      });
    });
  };

  // ============================================================ON MARKET DRAGGED
  const onMarkerDragged = async coordinate => {
    localDispatch({
      type: MARKER_DRAG,
      payload: coordinate,
    });
    await dbUserInfo
      .child(`${uid}/location`)
      .set({lat: coordinate.latitude, lng: coordinate.longitude});
  };

  // ============================================================ON SEARCH LOCATION
  const findLocation = ({name, text}) => {
    console.log(text);
  };
  // ============================================================CODE STARTED
  console.log('=====================================');
  console.log(state.allRides);
  console.log('=====================================');
  return (
    <Block padding={[0]}>
      <Block center middle style={styles.backCon}>
        <Image source={images.rideBack} style={styles.back} />
      </Block>
      {/* =================================== */}
      <Block padding={[0]}>
        <Block middle flex={false} style={styles.findCon}>
          <TextField
            inputStyling={{color: colors.white}}
            name="findlocation"
            onChangeText={findLocation}
            placeholder="Search Location You Want To Go.."
          />
        </Block>
        <Block center margin={[sizes.getHeight(2), 0, 0, 0]}>
          <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{width: sizes.getWidth(100), height: '100%'}}
            region={{
              latitude: state.coords.lat || 37.78825,
              longitude: state.coords.lng || -122.4324,
              latitudeDelta: 0.0009,
              // longitudeDelta: 0.030,
              longitudeDelta: sizes.withWidth(0.07) / sizes.withHeight(1),
      //         lat: 37.78825,
      // lng: -122.4324,
            }}
            zoomEnabled={true}
            // minZoomLevel={state.zoom}
          >
            <Marker
              draggable={true}
              onDragEnd={e => onMarkerDragged(e.nativeEvent.coordinate)}
              coordinate={{
                latitude: state.coords.lat || 37.78825,
                longitude: state.coords.lng || -122.4324,
              }}>
              <Image
                source={icons.car}
                style={{
                  resizeMode: 'contain',
                  width: sizes.getWidth(10),
                  height: sizes.getHeight(10),
                }}
              />
            </Marker>
            {state.allRides.length > 0 &&
              state.allRides.map((v, i) => {
                console.log(v.length);
                console.log('YES AVAILABLE ');
                console.log('----------------- ');
                console.log(v);
                console.log('----------------- ');
                return (
                  <Marker
                    key={i}
                    coordinate={{
                      longitude: v.location.lng,
                      latitude: v.location.lat,
                    }}>
                    {/* <Image
                        source={icons.user}
                        style={{
                          resizeMode: 'contain',
                          width: sizes.getWidth(10),
                          height: sizes.getHeight(10),
                        }}
                      /> */}
                  </Marker>
                );
              })}
            {/* <MapViewDirections
              origin={state.coords}
              // destination={{latitude:v.location.lat, longitude:v.location.lng}}
              destination={destination}
              apikey={'AIzaSyCozLIM_ekUBtCbp4sptKSpNUepCYefy9k'}
              strokeWidth={5}
              strokeColor={colors.background}
            /> */}
          </MapView>
        </Block>
      </Block>
      <Block center middle style={styles.findNearCon}>
        <Button onPress={showRides} opacity={0.7} style={styles.findNear}>
          <Text color={colors.white}>Find Near Rides</Text>
        </Button>
      </Block>
      {/* =================================== */}
    </Block>
  );
};

export {GetRide};

const styles = StyleSheet.create({
  backCon: {
    position: 'absolute',
    // zIndex:-1,
    // left: 0,
    bottom: 0,
    width: '100%',
  },
  back: {
    resizeMode: 'cover',
    width: sizes.getWidth(100),
  },
  findCon: {
    //   borderWidth:1,
    height: sizes.getHeight(10),
    backgroundColor: '#34343490',
  },
  findNearCon: {
    padding: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  findNear: {
    backgroundColor: colors.lightRed,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizes.getWidth(2),
  },
});
