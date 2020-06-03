import React, { useState, useEffect } from 'react';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles.js';
import ChatList from '../ChatList/ChatList';
import firebase from 'firebase';
import ChatView from '../ChatView/ChatView.js';

const Dashboard = ( props) => {
  const  [chat, setChat] = useState({
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    chats: [],
  });
  const { classes } = props;

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) {
        props.history.push('/login');
      } else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await setChat({
              ...chat,
              email: _usr.email,
              chats: chats,
            });
            // console.log(chat);
          })
      }
    })
  },[]);

  const selectChat = (chatIndex) => {
    setChat( {...chat, selectedChat: chatIndex});    
  }

  const newChatBtnClicked = () => {
    setChat({...chat,newChatFormVisible: true, selectedChat: null});
    
  }

  // SignOut function
  const signOut = () => {
    firebase.auth().signOut();
  }

  return (
    <div>
      <ChatList 
        history={props.history} 
        newChatBtn={newChatBtnClicked} 
        selectChatFn={selectChat}
        chats={chat.chats}
        userEmail={chat.email}
        selectedChatIndex={chat.selectedChat}
      />

      {
        chat.newChatFormVisible ? 
        null :
        <ChatView user={chat.email} chat={chat.chats[chat.selectedChat]} />
      }
      

      <Button className={classes.signOutBtn} onClick={signOut} > Sign Out </Button>
    </div>
  );
}

export default withStyles(styles)(Dashboard);