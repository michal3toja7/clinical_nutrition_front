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
          history:[],
        }
        this.appRouter = React.createRef();
      }
      
     updateTitle(newTitle){
       if(this.state.title!==newTitle)
          this.setState({title: newTitle})
      }

      goBack(){
        this.appRouter.current.goBack()
      }

      

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <div>
              <NavBar goBack={() => this.goBack()} title={this.state.title} />
                <Container>
                  <AppRouter ref={this.appRouter} title={(newTitle) => this.updateTitle(newTitle)}/>
                </Container>
            </div>
          </header>
        </div>
      );
    }
}


export default App;
