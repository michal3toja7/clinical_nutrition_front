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
          header: '',
        }
      }
      

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <div>
              <NavBar/>
                <Container>
                  <AppRouter/>
                </Container>
            </div>
          </header>
        </div>
      );
    }
}


export default App;
