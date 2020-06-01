import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ChatList from '../ChatList/ChatList';
import firebase from 'firebase';

const Dashboard = (props) => {
  const  [chat, setChat] = useState({
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    chats: [],
  });

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
    console.log('Selected a chat');
    
  }

  const newChatBtnClicked = () => {
    setChat({...chat,newChatFormVisible: true, selectedChat: null});
    
  }

  return (
      <ChatList 
        history={props.history} 
        newChatBtn={newChatBtnClicked} 
        selectChat={selectChat}
        chats={chat.chats}
        userEmail={chat.email}
        selectedChatIndex={selectChat}
        />
  );
}

export default Dashboard;