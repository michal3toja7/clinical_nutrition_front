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
            }
        }

        
        
    render(){
        return(
            <div style={style}>
                <Router>
                        <Switch>
                            <Redirect from="/" exact to="/home"/>
                            <Route path="/login" exact component={SignIn}/>
                            <SecretRoute path="/home" component={UserMenu}/>
                            <SecretRoute path="/admin/users" component={ListUserComponent}/>
                            <SecretRoute path="/admin/add-user" component={AddUserComponent}/>
                            <SecretRoute path="/admin/edit-user" component={EditUserComponent}/>
                            <SecretRoute path="/admin/jos" component={ListJosComponent}/>
                            <SecretRoute path="/admin/add-jos" component={AddJosComponent}/>
                            <SecretRoute path="/admin/edit-jos" component={EditJosComponent}/>
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
            signInService.isUserAuthenticated() ? (
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