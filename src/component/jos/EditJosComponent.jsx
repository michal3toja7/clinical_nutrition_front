import React, { Component } from 'react'
import JosService from "../../_services/JosService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class EditJosComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id:'',
            kod: '',
            nazwa: '',
            rodzaj: '',
            czyAktywny: false,
            nazwaPieczatka: '',
            adresMiasto: '',
            adresUlica: '',
            adresUlicaNumer: '',
            adresKodPocztowy: '',
            email: '',
            telefon: '',
            message: null,
            fieldWidth :'48%'
        }
        this.saveJos = this.saveJos.bind(this);
        this.loadJos = this.loadJos.bind(this);
    }
    
    componentWillMount(){
        var screenWidth= window.innerWidth;
        if(screenWidth<600){
            this.setState({fieldWidth: '100%' }) 
        }
        else{
            this.setState({fieldWidth: '48%' }) 
        }
        this.loadJos();
    }

    loadJos() {
        JosService.fetchJosById(window.localStorage.getItem("josId"))
            .then((result) => {
                let jos = result.data;
                this.setState({
                    id: jos.id,
                    kod: jos.kod,
                    nazwa: jos.nazwa,
                    rodzaj: jos.rodzaj,
                    czyAktywny: jos.czyAktywny,
                    nazwaPieczatka: jos.nazwaPieczatka,
                    adresMiasto: jos.adresMiasto,
                    adresUlica: jos.adresUlica,
                    adresUlicaNumer: jos.adresUlicaNumer,
                    adresKodPocztowy: jos.adresKodPocztowy,
                    email: jos.email,
                    telefon: jos.telefon,
                })
            });

            
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value }           
            );

    onCheckboxChange = (e) =>
    this.setState({ [e.target.name]: e.target.checked }
        );


    saveJos = (e) => {
        e.preventDefault();
        let jos = {
            id: this.state.id,
            kod: this.state.kod,
            nazwa: this.state.nazwa,
            rodzaj: this.state.rodzaj,
            czyAktywny: this.state.czyAktywny,
            nazwaPieczatka: this.state.nazwaPieczatka,
            adresMiasto: this.state.adresMiasto,
            adresUlica: this.state.adresUlica,
            adresUlicaNumer: this.state.adresUlicaNumer,
            adresKodPocztowy: this.state.adresKodPocztowy,
            email: this.state.email,
            telefon: this.state.telefon,
            };
        JosService.editJos(jos)
            .then(res => {
                this.setState({message : 'Jos zedytowany z powodzeniem.'});
                this.props.history.push('/admin/jos');
            });
    }

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
        return (
            <div>
                <form style={formContainer} component={Paper}>
                   <Typography variant="h6" fullwidth align="left">Dane Jednostki:</Typography>                      
                        <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                        name="id" label="ID" value={this.state.id} onChange={this.onChange} style={{marginRight: "100%",minWidth: "200px"}}/>
                
                        <TextField variant="outlined" autoFocus disabled type="text" margin="normal" required name="kod" 
                        label="Kod Jednostki" value={this.state.kod} onChange={this.onChange} style={fieldStyle.left}/>
                        
                        <TextField variant="outlined" autoFocus required type="text" label="Nazwa" margin="normal"
                        name="nazwa" value={this.state.nazwa} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus required select label="Rodzaj Jednostki" margin="normal"
                        name="rodzaj" value={this.state.rodzaj} onChange={this.onChange} style={fieldStyle.left}>
                            <MenuItem value={"Apteka"}>Apteka</MenuItem>
                            <MenuItem value={"Oddział"}>Oddział</MenuItem>
                            <MenuItem value={"Poradnia"}>Poradnia</MenuItem>
                            <MenuItem value={"Pracownia"}>Pracownia</MenuItem>
                            <MenuItem value={"Izba"}>Izba Przyjęć</MenuItem>
                            <MenuItem value={"Inny"}>Inny</MenuItem>
                        </TextField>

                    <Typography variant="h6" fullwidth align="left">Dane adresowe:</Typography>                    
                        <TextField variant="outlined" autoFocus type="text"   margin="normal" 
                        label="Nazwa na pieczątce" name="nazwaPieczatka" value={this.state.nazwaPieczatka} onChange={this.onChange} fullWidth/>

                        <TextField variant="outlined" autoFocus type="text"   
                        label="Adres - Miasto" margin="normal" name="adresMiasto" value={this.state.adresMiasto} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus type="text"   
                        label="Adres - Ulica" margin="normal" name="adresUlica" value={this.state.adresUlica} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus  type="text" label="Adres - Numer Ulicy" 
                        margin="normal" name="adresUlicaNumer" value={this.state.adresUlicaNumer} onChange={this.onChange} style={fieldStyle.left}/>
   
                        <TextField variant="outlined" autoFocus  type="text" label="Adres - Kod Pocztowy" 
                        margin="normal" name="adresKodPocztowy" value={this.state.adresKodPocztowy} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus  type="text" label="Email" 
                        margin="normal" name="email" value={this.state.email} onChange={this.onChange} style={fieldStyle.left}/>
   
                        <TextField variant="outlined" autoFocus  type="text" label="Telefon" 
                        margin="normal" name="telefon" value={this.state.telefon} onChange={this.onChange} style={fieldStyle.right}/>

                    <Typography variant="h6" fullwidth align="left">Dane Techniczne:</Typography>  

                    <FormControlLabel style= {fieldStyle.leftAlone} control={
                            <Checkbox onChange={this.onCheckboxChange} name="czyAktywny" checked={this.state.czyAktywny} value={this.state.czyAktywny} />    
                        }
                        label="Czy Aktywna"/>

                    <Button variant="contained" color="primary" onClick={this.saveJos}>Zapisz</Button>

            </form>
    </div>
        );
    }
}
const formContainer = {
    //  display: '',
      flexFlow: 'row wrap'
  };

export default EditJosComponent;