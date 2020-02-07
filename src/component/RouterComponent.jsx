import React, { Component,Fragment } from 'react';
import { BrowserRouter as  Router, Route, Switch, Redirect} from 'react-router-dom';
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import ListJosComponent from "./jos/ListJosComponent";
import AddJosComponent from "./jos/AddJosComponent";
import EditJosComponent from "./jos/EditJosComponent";
import ListPreparationComponent from "./preparation/ListPreparationComponent";
import EditPreparationComponent from "./preparation/EditPreparationComponent";
import AddPreparationComponent from "./preparation/AddPreparationComponent";
import ListPreparationBagComponent from "./preparation/ListPreparationBagComponent";
import EditPreparationBagComponent from "./preparation/EditPreparationBagComponent";
import AddPreparationBagComponent from "./preparation/AddPreparationBagComponent";
import ListPatientComponent from "./patient/ListPatientComponent";
import EditPatientComponent from "./patient/EditPatientComponent";
import AddPatientComponent from "./patient/AddPatientComponent";
import SignIn from "./SignIn";
import signInService from "../_services/SignInService";
import UserMenu from "./UserMenu";
import PremissionsPanel from "./user/PremissionsPanel";
import ListStudyComponent from "./patient/ListStudyComponent";




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
                            <SecretRoute path="/patients" 
                            component={(props) => <ListPatientComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/edit-patient" 
                            component={(props) => <EditPatientComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/add-patient" 
                            component={(props) => <AddPatientComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/admin/premissions" 
                            component={(props) => <PremissionsPanel {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/preparations" 
                            component={(props) => <ListPreparationComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/edit-preparation" 
                            component={(props) => <EditPreparationComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/add-preparation" 
                            component={(props) => <AddPreparationComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/preparationBags" 
                            component={(props) => <ListPreparationBagComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/edit-preparationBag" 
                            component={(props) => <EditPreparationBagComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/add-preparationBag" 
                            component={(props) => <AddPreparationBagComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
                            />
                            <SecretRoute path="/patient/study" 
                            component={(props) => <ListStudyComponent {...props} title={(newTitle) => this.updateTitle(newTitle)}/>}
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