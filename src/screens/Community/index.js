import React from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import {Block, Text, Button} from 'components';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {sizes, color, colors} from 'styles/theme';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';

const Community = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const {uid, email} = useSelector(state => state.auth.user);
  const dbComm = database().ref('community');
  const dbUserInfo = database().ref('User-Information');

  const checkIfInvolved = (collection, uid) => {
    // console.log(uid)
    let found = false;
    collection.forEach(el => {
      // console.log('here');
      // console.log(el.key);
      found = {community_key: el.key};
      el.forEach(obj => {
        // console.log(obj.val().uid)
        obj.val().uid === uid && (found = {...found, data: obj.val()});
      });
    });
    return found;
  };
  const joinCommunity = async () => {
    const parent = await dbUserInfo
      .orderByChild('userInfo/email')
      .equalTo(email)
      .once('value');
    if (parent.val()) {
      parent.forEach(async children => {
        // console.log('%%%%%%%%%%%%%%%%%%%');
        // console.log(children)
        if (children.val().community_id) {
            console.log('he joinned com already');
            // console.log(children.val().community_id)
          const refKey = children.val().community_id.community_id;
          const result = await dbComm
            .orderByKey()
            .equalTo(refKey)
            .once('value');
          const isInvolved = checkIfInvolved(result, uid);
          // console.log(isInvolved);
          console.log('community already joinned');
          navigation.navigate('Chat', {user: isInvolved, community: true});
        } else {
          console.log('NEW USER ARRIVED ');
          await database().ref('community').once('value', async data => {
          //   // check if community exsists
          if (data.exists()) {
            console.log("COMMUNITY EXISTS")
            data.forEach(async allCom => {
              // console.log(allCom.val())
              const comRefKey = allCom.key;
              await dbUserInfo.child(`/${uid}/community_id`).set({
                community_id: comRefKey,
                last_engaged: new Date(),
              });
              await database()
                .ref(`community/${comRefKey}/${uid}`)
                .set({
                  email: email,
                  joined_at: new Date(),
                  uid: uid,
                });
                Alert.alert('Great', 'You have been register in community.\nPress Again to Enter in Community')
            });
          
          
          } else {
            console.log(" new community is going to create")
            const ref = await database()
              .ref('community')
              .push({[uid]: {email: email, uid: uid, joined_at: Date.now()}});
            await database()
              .ref(`User-Information/${uid}`)
              .child('community_id')
              .set({community_id: ref.key, last_engaged: new Date()});
            navigation.navigate('Chat', {
              user: {
                community_key: ref.key,
                data: {email: email, joinned_at: new Date(), uid: uid},
              },
              community: true,
            });
          }
        })
        }
      });
    }
  };

  return (
    <Block color={colors.white} padding={[0, sizes.getWidth(3)]} padding={[0]}>
      <Block style={styles.bcCon}>
        <Image source={images.communityBackground} style={styles.background} />
      </Block>
      <Block middle center style={styles.cardCon} r>
        <Button opacity={0.4} style={styles.btnStyle} onPress={joinCommunity}>
          <Text color={colors.white}> Join Community</Text>
        </Button>
      </Block>

      <Block style={{...styles.bcCon, bottom: 0}}>
        <Image
          source={images.communityBackgroundOne}
          style={styles.background}
        />
      </Block>
    </Block>
  );
};

export {Community};

const styles = StyleSheet.create({
  cardCon: {
    width: '100%',
    // borderWidth:1
  },
  bcCon: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'contain',
    flex: 0.4,
  },
  btnStyle: {
    backgroundColor: colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
});
