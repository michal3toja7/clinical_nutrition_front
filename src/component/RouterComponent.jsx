import React, { Component,Fragment } from 'react';
import { BrowserRouter as  Router, Route, Switch, Redirect} from 'react-router-dom';
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import ListJosComponent from "./jos/ListJosComponent";
import AddJosComponent from "./jos/AddJosComponent";
import EditJosComponent from "./jos/EditJosComponent";
import SignIn from "./SignIn";
import signInService from "../_services/SignInService";
import UserMenu from "./UserMenu";




class RouterComponent extends Component {

        constructor(props){
            super(props);
            this.state ={
              time: '',
            }
            
        }

        componentWillMount(){
          this.props.title(this.state.title)
          
        }

        updateTitle(newTitle){
          this.props.title(newTitle)
        }
  
        
    render(){
        return(
            <div style={style}>
                <Router>
                        <Switch>
                            <Redirect from="/" exact to="/home"/>
                            <Route title={'testowanko'} path="/login" exact 
                            component={(props) => <SignIn {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/home" 
                            component={(props) => <UserMenu {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/users" 
                            component={(props) => <ListUserComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/add-user" 
                            component={(props) => <AddUserComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/edit-user" 
                            component={(props) => <EditUserComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/jos" 
                            component={(props) => <ListJosComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/add-jos" 
                            component={(props) => <AddJosComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/edit-jos" 
                            component={(props) => <EditJosComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                        </Switch>
                </Router>
            </div>
        )
    }
}

const style={
    marginTop:'100px',
    backgroundColor:'white',
    padding: '3%',
    borderRadius:'30px',
    border:'solid',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    textColor:'black'
    
}

function SecretRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          signInService.currentUserValue ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  


export default RouterComponent;