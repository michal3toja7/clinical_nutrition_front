import React, { Component } from 'react'
import UserService from "../../_services/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            title: 'Dodawanie Użytkownika',
            username: '',
            password: '',
            imiona: '',
            nazwisko: '',
            pesel: '',
            rodzaj_personelu: '',
            stanowisko: '',
            administrator: false,
            zablokowany: false,
            message: null,
            fieldWidth :'48%'
        }
        this.props.title(this.state.title);
        this.saveUser = this.saveUser.bind(this);
    }
    componentWillMount(){
        var screenWidth= window.innerWidth;
        if(screenWidth<600){
            this.setState({fieldWidth: '100%' }) 
        }
        else{
            this.setState({fieldWidth: '48%' }) 
        }
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username,
                    password: this.state.password,
                    imiona: this.state.imiona,
                    nazwisko: this.state.nazwisko, 
                    pesel: this.state.pesel, 
                    rodzaj_personelu: this.state.rodzaj_personelu,
                    stanowisko: this.state.stanowisko, 
                    administrator: "true",//this.state.administrator, 
                    zablokowany: "false"//this.state.zablokowany, 
                    };
        UserService.addUser(user)
            .then(res => {
                this.setState({message : 'Użytkownik dodany prawidłowo.'});
                this.props.history.push('/admin/users');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    onCheckboxChange = (e) =>
    this.setState({ [e.target.name]: e.target.checked });

   

    render() {
        const fieldStyle = {
            left: {
                width: this.state.fieldWidth, 
                float: "left"
            },
        
            right: {
                width: this.state.fieldWidth, 
                float: "right"
            },
            leftAlone: {
                width: this.state.fieldWidth, 
                marginRight: "100%"
            },
          };

        return(
            <div>
                <form style={formContainer} component={Paper}>
                   <Typography variant="h6" fullwidth align="left">Dane konta:</Typography>                      
                        <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                        name="id" label="ID" value={this.state.id} onChange={this.onChange} style={{marginRight: "100%",minWidth: "200px"}}/>
                
                        <TextField variant="outlined" autoFocus type="text" margin="normal" required name="username" 
                        label="Nazwa Użytkownika" value={this.state.username} onChange={this.onChange} style={fieldStyle.left}/>
                        
                        <TextField variant="outlined" autoFocus required type="password" label="Hasło" margin="normal"
                        name="password" value={this.state.password} onChange={this.onChange} style={fieldStyle.right}/>
                    <Typography variant="h6" fullwidth align="left">Dane osobowe:</Typography>                    
                        <TextField variant="outlined" autoFocus type="text" required  margin="normal" 
                        label="Imiona" name="imiona" value={this.state.imiona} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus type="text"  required 
                        label="Nazwisko" margin="normal" name="nazwisko" value={this.state.nazwisko} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus  required type="number" label="Pesel" 
                        margin="normal" name="pesel" value={this.state.pesel} onChange={this.onChange} style={fieldStyle.leftAlone}/>
                    <Typography variant="h6" fullwidth align="left">Dane Zawodowe:</Typography>  
                        <TextField variant="outlined" autoFocus select label="Rodzaj Personelu" margin="normal"
                        name="rodzaj_personelu" value={this.state.rodzaj_personelu} onChange={this.onChange} style={fieldStyle.left}>
                            <MenuItem value={"Lekarz"}>Lekarz</MenuItem>
                            <MenuItem value={"Pielęgniarka"}>Pielęgniarka</MenuItem>
                            <MenuItem value={"Fizjoterapeuta"}>Fizjoterapeuta</MenuItem>
                            <MenuItem value={"Farmaceuta"}>Farmaceuta</MenuItem>
                            <MenuItem value={"Opiekun Medyczny"}>Opiekun Medyczny</MenuItem>
                            <MenuItem value={"Inny"}>Inny</MenuItem>
                        </TextField>

                        <TextField variant="outlined" autoFocus type="text" label="Stanowisko" margin="normal"
                         name="stanowisko" value={this.state.stanowisko} onChange={this.onChange} style={fieldStyle.right}/>
                        
                        <TextField variant="outlined" autoFocus type="text" label="NPWZ" margin="normal"  
                         name="npwz" value={this.state.npwz} onChange={this.onChange} style={fieldStyle.leftAlone}/>                        

                    <Typography variant="h6" fullwidth align="left">Dane Techniczne:</Typography>
                        <FormControlLabel style= {fieldStyle.leftAlone} control={
                            <Checkbox onChange={this.onCheckboxChange} name="administrator" checked={this.state.administrator} value={this.state.administrator} />    
                        }
                        label="Czy Administrator"/>

                        <FormControlLabel style= {fieldStyle.leftAlone} control={
                            <Checkbox onChange={this.onCheckboxChange} name="zablokowany" checked={this.state.zablokowany} value={this.state.zablokowany} />    
                        }
                        label="Czy Zablokowany"/>

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Zapisz</Button>

            </form>
    </div>
        );
    }
}
const formContainer = {
  //  display: '',
    flexFlow: 'row wrap'
};





export default AddUserComponent;