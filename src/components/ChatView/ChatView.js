import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core';

const ChatView = ({ classes, chat, user }) => {

  useEffect(() => {
    const container = document.getElementById('chatview-container');
    container.scrollTo(0, container.scrollHeight);
  },[chat]);

  if (chat === undefined) {
    return (
      <main id="chatview-container" className={classes.content}></main>
    );
  } else {
    return (
      <div>
        <div className={classes.chatHeader}>
          Your conversation with { chat.users.filter(usr => usr !== user)[0] }
        </div>

        <main id="chatview-container" className={classes.content}>
          {
            chat.messages.map((msg, index) => {
              return(
                <div key={index} className={msg.sender === user ? classes.userSent : classes.friendSent}>
                  { msg.message }
                </div>
              );
            })
          }
        </main>
      </div>
    );
  }
};

export default withStyles(styles)(ChatView);