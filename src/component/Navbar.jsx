import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import signInService from "../_services/SignInService";


 class Navbar extends Component{
  constructor(props){
    super(props);
    this.state ={
      title: '',
      auth: signInService.isUserAuthenticated(),
      anchorEl: '',
    }
  //  this.headerUpdate=this.headerUpdate.bind(this);

}

componentDidMount() {
  this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
//this.setState({title: this.changeTitle()})
}
componentWillUnmount() {
  clearInterval(this.interval);
}


changeTitle = () => {
    switch(window.location.pathname){
      case "/login":
          return 'Zaloguj się';
      case "/admin/users":
        return 'Użytkownicy';
      case "/admin/edit-user":
        return 'Edycja użytkownika';
      case "/admin/add-user":
          return 'Dodawanie użytkownika';
    }
  }

 

  render(){
    const open = Boolean(this.state.anchorEl);

    const handleChange = event => {
      this.setState({
        auth: event.target.checked
      })
    };
  
    const handleMenu = event => {
      this.setState({
        anchorEl: event.currentTarget
      })
    };
  
    const handleClose = () => {
      this.setState({
        anchorEl: null
      })
    };

    const handleCloseLogout = () => {
      this.setState({
        anchorEl: null
      })
      signInService.logout();
    };

    let title = this.changeTitle();

    return (
      <div className={useStyles.root}>
        <AppBar position="fixed">
          <Toolbar style={toolbar}>

            <div style={navLeft}>
            </div>

            <div style={navCenter}>
              <Typography variant="h4" className={useStyles.title}>
                {title}
              </Typography>
            </div>

            {this.state.auth && (
              <div style={navRight}>
              <Typography style={{display:'inline-block'}} variant="h6">
                Zalogowany: {signInService.currentUser.imiona} {signInService.currentUser.nazwisko}
              </Typography>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{display:'inline-block', float: 'right'}}
              >
       
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Moje konto</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Wyloguj</MenuItem>
              </Menu>
              </div>
            )}

          </Toolbar>
        </AppBar>
      </div>
    );
    }
}


const toolbar = {
 // float       : 'none', 
 //   marginLeft  : 'auto',
//marginRight : 'auto',
    font: 'bold'
}
const navLeft = {
  float: 'left',
  width: '33%'
}
const navCenter = {
  float: 'center',
  width: '33%'
}
const navRight = {
  display:'inline-block',
  float: 'right',
  width: '33%', 
  alignItems: 'right', 
  justifyContent: 'right'
}
const useStyles = makeStyles(theme => ({
  left:{
    float: 'left',
    width: '33%'
  },
    center:{
    float: 'center',
    width: '33%'
  },
  right:{
    display:'inline-block',
    float: 'right',
    width: '33%', 
    alignItems: 'right', 
    justifyContent: 'right'
  },
  root: {
    flexGrow: 1,


  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
   // alignItems: 'center',
   // justifyContent: 'center'
  },
}));

export default Navbar;