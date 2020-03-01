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
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import { Button } from '@material-ui/core';

 class Navbar extends Component{
  constructor(props){
    super(props);
    this.state ={
      title: '',
      auth: signInService.currentUserValue,
      anchorEl: false,
    }
  //  this.headerUpdate=this.headerUpdate.bind(this);

}

  componentDidUpdate(){
    if(this.state.title!== this.props.title){
      this.setState({title: this.props.title,
                    auth: signInService.currentUserValue})
      }
  }
component(){
  if(!this.state.title === this.props.title){
  this.setState({title: this.props.title})
  }
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

   // let title = this.changeTitle();

    return (
      <div className={useStyles.root}>
        <AppBar position="fixed">
          <Toolbar style={toolbar}>
            <div style={flexStyle}>
              {this.state.auth && (
                  <div style={{width: "33%"}}>
                    <div style={{width: "25%"}}>
                    <Button onClick={() => this.props.goBack()}>
                      <ReplyRoundedIcon
                      style={iconStyle}>
                      </ReplyRoundedIcon></Button>
                      </div>
                      <div style={{width: "75%"}}></div>
                  </div>
              )}
              {this.state.auth && (
                  <div style={{width: "33%"}}>
                    <Typography variant="h4" className={useStyles.title}>
                      {this.state.title}
                    </Typography>
                  </div>
              )}
              {!this.state.auth && (
                  <div style={{width: "100%"}}>
                    <Typography variant="h4" className={useStyles.title}>
                      {this.state.title}
                    </Typography>
                  </div>
              )}
              {this.state.auth && (
                  <div style={{width: "25%"}}>
                  <Typography variant="h6">
                    Zalogowany: {this.state.auth.imiona} {this.state.auth.nazwisko}
                  </Typography>
                  </div>
              )}
              {this.state.auth && (
                  <div style={{width: "8%"}}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    style={iconStyle}
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
              </div>
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
const flexStyle={
  width: "100%",
  display: "flex",
  flexDirection: "row", 
  alignItems: "center", 
  flexWrap: "wrap"
}
const iconStyle={
  color: "white",
  clear: "both",
  transform: "scale(2)", 
  margin: "10px"
}

const useStyles = makeStyles(theme => ({
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