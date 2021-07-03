import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Block, Text} from 'components';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {sizes, color, colors} from 'styles/theme';
import {useSelector, useDispatch} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const emptyChatView = () => {
  return (
    <Block
      middle
      center
      // style={styles.emptyChatCon}
    >
      <Text color={colors.lightRed} h2>
        Great! You can now start conversation
      </Text>
    </Block>
  );
};

const Chat = props => {
  const {navigation, route} = props;
  const {uid, email} = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState();
  const [chatWith, setChatWith] = useState();
  const [roomId, setRoomId] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    setChatWith(route?.params.reciever);
    setRoomId(route?.params.roomId);
  }, [route?.params.reciever, route?.params.roomId]);

  const onSend = async sendMessage => {
    // ========================================
    if (!route.params?.community) {
      console.log('i am in chat not community');
      console.log(route.params.community);
      let completeMessage = {
        // _id: chatWith.uid,
        _id: Math.round(Math.random() * 100000000),
        text: message,
        createdAt: new Date().toDateString(),
        user: {
          _id: uid,
          name: email,
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      const messageRef = await database()
        .ref(`messages/${roomId}`)
        .push(completeMessage);
      // console.log(messageRef.key)
      await database()
        .ref(`chat-rooms/${roomId}`)
        .update({last_msg_id: messageRef.key, last_msg: message});
    }
    // ========================================
    else {
      console.log('i am in community');
      // console.log(route.params.community)

      const userdata = route.params?.user.data;
      console.log(userdata);
      let completeMessage = {
        _id: Math.round(Math.random() * 100000000),
        text: message,
        createdAt: new Date().toDateString(),
        user: {
          _id: userdata.uid,
          name: userdata.email,
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      // console.log('comunity message')
      // console.log(completeMessage)
      // setMessages(prev => (GiftedChat.append(prev,completeMessage)));

      const comKey = route.params?.user.community_key;
      // console.log(comKey)
      const messageRef = await database()
        .ref(`community-message/${comKey}`)
        .push(completeMessage);
      await database()
        .ref(`community/${comKey}`)
        .update({last_msg_id: messageRef.key, last_msg: message});
    }
  };
  useEffect(() => {
    (async function() {
      let allMsg = [];
      await database()
        .ref(`/messages/${roomId}`)
        .once('value', allChats => {
          allChats.forEach(eachChat => {
            allMsg.push(eachChat.val());
          });
          setMessages(allMsg);
        });
    })();
  }, [!route.params?.community, messages, setMessages]);

  // console.log('============================');
  // console.log(messages);
  // console.log('============================');
  // ==========================================================================

  // ==================================COMMUNITY STARTED ========================================
  const [comMessages, setComMessages] = useState([])
  useEffect(() => {
    // console.log('Fetcing Com Messages');
    (async function() {
    let allMsg = []
      database()
      .ref('community-message').limitToLast(3)
      .once('value', async allChat => {
        // console.log('allChat.val()')
        // console.log(allChat.val())
        await allChat.forEach(eachChat => {
          eachChat.forEach(oneChat => {
            allMsg.push(oneChat.val());
          });
        });
        setComMessages(allMsg.reverse());
      })
    })()

  }, [route.params.community,setComMessages,messages]);

  // ==================================COMMUNITY ENDED===========================================
  return (
    <Block padding={[0]}>
      <GiftedChat
        messagesContainerStyle={{backgroundColor: colors.background}}
        messages={route.params.community ? comMessages : messages}
        onInputTextChanged={e => setMessage(e)}
        onSend={() => onSend(message)}
        user={{
          _id: uid,
        }}
        renderChatEmpty={() => emptyChatView()}
        inverted={false}
      />
    </Block>
  );
};

export {Chat};

const styles = StyleSheet.create({});
