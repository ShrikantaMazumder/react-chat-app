import React from 'react';
import { withStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Button, ListItemIcon } from '@material-ui/core';
import NotificationImportant from '@material-ui/icons';
import styles from '../Login/styles';


const ChatList = ({ classes, chats, selectedChatIndex, userEmail }) => {
  

  const newChat = () => {
    console.log('New chat')
  }

  const selectChat = (index) => {
    console.log('Select chat', index);
  }
  
  if (chats.length > 0) {
    return (
      <main className={classes.root}>
        <Button 
          variant='contained' 
          fullWidth 
          color='primary' 
          className={classes.newChatBtn}
          onClick={newChat}
          >
            New Message
        </Button>
        <List>
          {
            chats.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem onClick={() => selectChat(index)}
                  className={classes.lisItem}
                  selected={selectedChatIndex === index}
                  alignItems='flex-start'
                >
                  <ListItemAvatar>
                  <Avatar alt='Reny Sharp'>{chat.users.filter(user => user !== userEmail)[0].split('')[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={chat.users.filter(user => user !== userEmail)[0]}
                    secondary={
                      <>
                        <Typography component='span' color='textPrimary'>
                          {
                            chat.messages[chat.messages.length - 1].message.substring(0, 30)
                          }
                        </Typography>
                      </>
                    }
                  >
  
                  </ListItemText>
                </ListItem>
                <Divider></Divider>
                </div>
              );
            })
          }
        </List>
      </main>
    );
  } else {
    return (
      <main className={classes.root}>
        <Button 
          variant='contained' 
          fullWidth 
          color='primary' 
          className={classes.newChatBtn}
          onClick={newChat}
          >
            New Message
        </Button>
        <List></List>
      </main>
    );
  }
}

export default withStyles(styles)(ChatList);