import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FormControl, 
  InputLabel, 
  Input, 
  Paper, 
  withStyles, 
  CssBaseline, 
  Typography, 
  Button } 
  from '@material-ui/core';
import styles from './styles';
import firebase from 'firebase';


const Login = (props) => {
  const [ loginInfo, setLoginInfo ] = useState({
    email: null,
    password: null,
    errorMsg: '',
  });
  const userTyping =(type, e) => {
    switch (type) {
      case 'email':
        setLoginInfo({...loginInfo, email: e.target.value});
        break;
      case 'password':
        setLoginInfo({...loginInfo, password: e.target.value});
        break;
      default:
        break;
    }
  }

  const submitLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
    .then(() => {
      props.history.push('/dashboard');
    })
    .catch(error => {
      setLoginInfo({...loginInfo, errorMsg: 'Server Error'});
      console.log(error);
      
    });
  }
  const { classes } = props;
  return (
    <main className={classes.main}>
      <CssBaseline></CssBaseline>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In!
        </Typography>
        <form className={classes.form} onSubmit={submitLogin}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login-email">Enter Your Email</InputLabel>
            <Input autoComplete="email" autoFocus id="login-email" onChange={(e) => userTyping('email',e)}></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login-password">Enter Your Password</InputLabel>
            <Input type="password" id="login-password" onChange={(e) => userTyping('password',e)}></Input>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >Submit</Button>
        </form>
        {
          loginInfo.errorMsg ?
          <Typography component='h5' variant='h6' className={classes.errorText} >
            Incorrect Login Information!
          </Typography> :
          null
        }
        <Typography component='h5' variant='h6' className={classes.noAccountHeader}>Don't Have An Account</Typography>
        <Link className={classes.signUpLink} to="/signup">Sign Up!</Link>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Login);