import React, { Component } from 'react'
import './App.css';
import AppRouter from "./component/RouterComponent";
import NavBar from "./component/Navbar";
import Container from '@material-ui/core/Container';

window.API_URL = 'http://localhost:8080/api'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
          title: "",
        }
      }
      
     updateTitle(newTitle){
       if(this.state.title!==newTitle)
          this.setState({title: newTitle})
      }

      

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <div>
              <NavBar title={this.state.title} />
                <Container>
                  <AppRouter title={(newTitle) => this.updateTitle(newTitle)}/>
                </Container>
            </div>
          </header>
        </div>
      );
    }
}


export default App;
