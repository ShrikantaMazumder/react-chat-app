import React, { useState } from 'react';
import { Input, FormControl, InputLabel, Paper, CssBaseline, Typography, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './styles.js';
const firebase = require('firebase');


const Signup = (props) => {
  const { classes } = props;
  const [signUpInfo, setSignupInfo] = useState({ 
    email: null, 
    password: null, 
    confirmPass: null, 
    errorMsg: '' 
  });
    
  const formIsValid = () => signUpInfo.password === signUpInfo.confirmPass;

  const userTyping = (type,e) => {
    switch (type) {
      case 'email':
        setSignupInfo({...signUpInfo,email: e.target.value});
        break;

      case 'password':
        setSignupInfo({...signUpInfo,password: e.target.value});
        break;

      case 'confirmPass':
        setSignupInfo({...signUpInfo,confirmPass: e.target.value});
        break;
    
      default:
        break;
    }
  }

  const submitSignup = (e) => {
    e.preventDefault();
    
    if (!formIsValid()) {
      setSignupInfo({...signUpInfo, errorMsg: 'Password not matched!'});
      return;       
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(signUpInfo.email, signUpInfo.password)
      .then(authRes =>{
        const userObj = {
          email: authRes.user.email,
        }
        firebase.firestore().collection('users').doc(signUpInfo.email).set(userObj)
        .then(() => {
          props.history.push('/dashboard');
        }, dbError => {
          console.log(dbError);
          setSignupInfo({...signUpInfo, errorMsg: 'Failed to add user'})
        })
    }, authError => {
      console.log(authError);
      setSignupInfo({...signUpInfo, errorMsg: 'Failed to add user'})
    })
  }

  return (
    <main className={classes.main}>
      <CssBaseline></CssBaseline>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up!
        </Typography>
        <form onSubmit={submitSignup} className={classes.form} >
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor='signup-email-input'>Enter your email</InputLabel>
            <Input autoComplete='email' type="email" autoFocus id='signup-email' onChange={(e) => userTyping('email', e)}></Input>
          </FormControl>
          <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
            <Input type="password" onChange={(e) => userTyping('password', e)} id='signup-password'></Input>
          </FormControl>
          <FormControl required fullWidth margin='normal'>
            <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Password</InputLabel>
            <Input type="password" onChange={(e) => userTyping('confirmPass', e)} id='signup-password-confirmation'></Input>
          </FormControl>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
        </form>
        {
          signUpInfo.errorMsg ? 
          <Typography component="h5" variant="h6" className={classes.errorText} >
            {
              signUpInfo.errorMsg
            }
          </Typography> : 
          null
        }
        <Typography component="h5" variant="h6" className={classes.hasAccountHeader}>Already Have An Account?</Typography>
        <Link className={classes.logInLink} to="/login">Log In!</Link>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Signup);