import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import signInService from "../_services/SignInService";


const useStyles = makeStyles(theme => ({
  paper: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%' // Fix IE 11 issue.

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  





export default function SignIn(props) {

    const authenticate= (e) => {
      let user = {
        username: username,
        password: userPassword,
      }
      if(signInService.login(user)){
        props.history.push("/home");
      }
     

    }

    const [username, setUsername] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box borderRadius="50%">
      <div className={classes.paper}>
        <form className={classes.form}>
            <TextField 
            variant="outlined" 
            autoFocus 
            type="text" 
            margin="normal" 
            required 
            name="username" 
            label="Nazwa Użytkownika" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            fullWidth
            />
            
            <TextField variant="outlined"
            autoFocus 
            required 
            type="password" 
            label="Hasło" 
            margin="normal"
            name="password" 
            value={userPassword} 
            onChange={e => setUserPassword(e.target.value)} 
            fullWidth
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={authenticate}
            >
            Zaloguj
          </Button>
        </form>
      </div>
      </Box>
    </Container>
  );
}

