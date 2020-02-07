import React, { Component } from 'react'
import PatientService from "../../_services/PatientService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';


class EditPatientComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            title: 'Edycja Pacjenta',
            id:'',
            nazwisko: '',
            imiona: '',
            pesel: 0,
            plec: '',
            dataUrodzenia: new Date(),
            miasto: '',
            kodPocztowy: '',
            ulica: '',
            nrDomu: '',
            nrMieszkania: '',
            czyZyje: true,
            message: null,
            fieldWidth :'48%'
        }
        this.props.title(this.state.title);
        this.savePatient = this.savePatient.bind(this);
        this.loadPatient = this.loadPatient.bind(this);
    }
    
    componentDidMount(){
        this.loadPatient();
        var screenWidth= window.innerWidth;
        if(screenWidth<600){
            this.setState({fieldWidth: '100%' }) 
        }
        else{
            this.setState({fieldWidth: '48%' }) 
        }

    }

    loadPatient() {
        PatientService.fetchPatientById(window.localStorage.getItem("patientId"))
            .then((result) => {
                let patient = result.data;
                this.setState({
                    id: patient.id,
                    nazwisko: patient.nazwisko,
                    imiona: patient.imiona,
                    pesel: patient.pesel,
                    plec: patient.plec,
                    dataUrodzenia: new Date(patient.dataUrodzenia),
                    miasto: patient.adresZamieszkania.miasto,
                    kodPocztowy: patient.adresZamieszkania.kodPocztowy,
                    ulica: patient.adresZamieszkania.ulica,
                    nrDomu: patient.adresZamieszkania.nrDomu,
                    nrMieszkania: patient.adresZamieszkania.nrMieszkania,
                    czyZyje: patient.czyZyje,
                })
            });

            
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value }           
            );

    onCheckboxChange = (e) =>
    this.setState({ [e.target.name]: e.target.checked }
        );


    savePatient = (e) => {
        e.preventDefault();
        let patient = {
            id: this.state.id,
            nazwisko: this.state.nazwisko,
            imiona: this.state.imiona,
            pesel: this.state.pesel,
            plec: this.state.plec,
            dataUrodzenia: this.state.dataUrodzenia,
            adresZamieszkania: {
                miasto: this.state.miasto,
                kodPocztowy: this.state.kodPocztowy,
                ulica: this.state.ulica,
                nrDomu: this.state.nrDomu,
                nrMieszkania: this.state.nrMieszkania,
            },
            czyZyje: this.state.czyZyje,
            };
        PatientService.editPatient(patient)
            .then(res => {
                this.setState({message : 'Pacjent Zedytowany z sukcesem.'});
                this.props.history.push('/patients');
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
                   <Typography variant="h6" fullwidth align="left">Dane osobowe:</Typography>                      
                        <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                        name="id" label="ID" value={this.state.id} onChange={this.onChange} style={{marginRight: "100%",minWidth: "200px"}}/>
                               
                        <TextField variant="outlined" autoFocus type="text" required  margin="normal" 
                        label="Imiona" name="imiona" value={this.state.imiona} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus type="text"  required 
                        label="Nazwisko" margin="normal" name="nazwisko" value={this.state.nazwisko} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus  required type="number" label="Pesel" 
                        margin="normal" name="pesel" value={this.state.pesel} onChange={this.onChange} style={fieldStyle.left}/>

                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker variant="inline" format="dd.MM.yyyy" margin="normal" label="Data Urodzenia" name="dataUrodzenia"
                            value={this.state.dataUrodzenia} onChange={(date) => this.setState({dataUrodzenia: new Date(date)})} style={fieldStyle.right}/>
                        </MuiPickersUtilsProvider>

                        <TextField variant="outlined" autoFocus select label="Płeć" margin="normal"
                        name="plec" value={this.state.plec} onChange={this.onChange} style={fieldStyle.leftAlone}>
                            <MenuItem value={"M"}>Mężczyzna</MenuItem>
                            <MenuItem value={"K"}>Kobieta</MenuItem>
                        </TextField>

                        <Typography variant="h6" fullwidth align="left">Dane Adresowe:</Typography>
                        
                        <TextField variant="outlined" autoFocus type="text" label="Adres - Miasto" margin="normal"  
                         name="miasto" value={this.state.miasto} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus type="text" label="Adres - Kod Pocztowy" margin="normal"  
                         name="kodPocztowy" value={this.state.kodPocztowy} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus type="text" label="Adres - Ulica" margin="normal"  
                         name="ulica" value={this.state.ulica} onChange={this.onChange} style={fieldStyle.left}/>
                 
                        <TextField variant="outlined" autoFocus type="text" label="Adres - Nr Domu" margin="normal"  
                         name="nrDomu" value={this.state.nrDomu} onChange={this.onChange} style={fieldStyle.right}/>    

                        <TextField variant="outlined" autoFocus type="text" label="Adres - Nr Mieszkania" margin="normal"  
                         name="nrMieszkania" value={this.state.nrMieszkania} onChange={this.onChange} style={fieldStyle.leftAlone}/>                                                     


                        <FormControlLabel style= {fieldStyle.leftAlone} control={
                            <Checkbox onChange={this.onCheckboxChange} name="czyZyje" checked={this.state.czyZyje} value={this.state.czyZyje} />    
                        }
                        label="Czy Żyje"/>


                    <Button variant="contained" color="primary" onClick={this.savePatient}>Zapisz</Button>

            </form>
    </div>
        );
    }
}
const formContainer = {
    //  display: '',
      flexFlow: 'row wrap'
  };

export default EditPatientComponent;