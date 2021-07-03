import React, {useEffect, useState, useReducer} from 'react';
import database, {firebase} from '@react-native-firebase/database';
import {Block, Text, Button} from 'components';
import {StyleSheet, Image} from 'react-native';
import {colors, sizes} from 'styles/theme';
import {useSelector} from 'react-redux';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {compose} from 'redux';

const Messages = props => {
  const {uid, email} = useSelector(state => state.auth.user);
  //   console.log('==========***********===========')
  //   console.log(user)
  const dbUserInfo = database().ref('/User-Information');
  const dbChatroom = database().ref('/chatrooms');
  const {navigation, route} = props;
  // console.log(navigation)
  // ===============================================
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const fetch = getUserList();
    // console.log("ad")
    return () => fetch
  });
  const getUserList = async () => {
    await dbUserInfo.on('value', data => {
      // console.log(data.val())
      data.forEach(user => {
        if (user.val().userInfo.uid !== uid) {
          userList.length > 0
            ? userList.forEach(userInState => {
                userInState.userInfo.uid === user.val().userInfo.uid
                  ? console.log('already added ')
                  : console.log('new entry from db');
              })
            : setUserList(prev => [...prev, user.val()]);
        }
      });
    });
  };
  //   ========================================================
  // const [isFound, setIsFound] = useState(false);
  const CHAT_FOUND = 'Chat_Found';
  const initialState = {
    chatFound: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case CHAT_FOUND:
        return {...state, chatFound: action.payload};
      default:
        return state;
    }
  };
  const [state, localDispatch] = useReducer(reducer, initialState);

  const checkIfExists = (chatrooms, chatWithId) => {
    let found = false;
    chatrooms.forEach(el => {
      if (el.val().reciever_id === chatWithId || el.val().reciever_id === uid) {
        if(el.val().sender_id === chatWithId || el.val().sender_id === uid  ){
          found = el.key
        }
      }
    });
    return found;
  };

  const startChat = async chatWith => {
    const chatWithId = chatWith.uid;
    const chatroom = await database()
      .ref('chat-rooms')
      // .orderByChild('reciever_id')
      // .equalTo(chatWithId)
      .once('value');
    const isFound = checkIfExists(chatroom, chatWith.uid);
    if (!isFound) {
      const details = {
        created_at : new Date(),
        name : "",
        last_msg_id:"",
        last_msg:"",
        sender_id : uid,
        reciever_id : chatWith.uid,
      }
      const chatRef = await database().ref('chat-rooms').push(details)
      const roomId = chatRef.key
      await dbUserInfo.child(`${uid}/room-id`).set({roomId:roomId, last_engaged:new Date().getTime()})
      await dbUserInfo.child(`${chatWithId}/room-id`).set({roomId:roomId, last_engaged:new Date().getTime()})
      navigation.navigate('Chat', {roomId:roomId,reciever:chatWith})
    } else {
      console.log('i am from message inbox is running, chat persisted')
      navigation.navigate('Chat', {roomId:isFound,reciever:chatWith})
    }
  };

  //   ========================================================
  // console.log('==============================');
  // console.log(userList);
  // console.log(state.chatFound);
  // console.log('==============================');
  //   ========================================================
  return (
    <Block padding={[0]} color={colors.background}>
      <Block middle center style={styles.background}>
        <Image source={images.rideBack} />
      </Block>
      <Block center middle flex={false} style={styles.heading}>
        <Text header color={colors.white}>
          Messages
        </Text>
      </Block>
      {userList.length ? (
        userList.map((v, i) => {
          return (
            <Block
              flex={false}
              key={i}
              height={sizes.getHeight(7)}
              margin={[sizes.getHeight(1), 0]}
              style={{opacity: 0.7, elevation: 5}}>
              <Button
                onPress={() => startChat(v.userInfo)}
                middle
                opacity={0.3}
                color={colors.white}
                style={{
                  width: '100%',
                  height: '100%',
                  paddingHorizontal: sizes.getWidth(1),
                }}>
                <Text color={colors.black}>{v.userInfo.email}</Text>
              </Button>
            </Block>
          );
        })
      ) : (
        <Block center>
          <Text color={colors.gray}>No message START CHAT.</Text>
        </Block>
      )}
    </Block>
  );
};

export {Messages};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  heading: {
    height: sizes.getHeight(10),
    backgroundColor: '#31F44210',
  },
});
