import React, { Component } from 'react'
import JosService from "../../_services/JosService";
import StudyService from "../../_services/StudyService";
import PatientService from "../../_services/PatientService";
import { Typography } from '@material-ui/core';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,DateTimePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import StudyComponent from '../patient/StudyComponent';
import OrderPosition from './OrderPosition';
import Autocomplete from '@material-ui/lab/Autocomplete';






class EditOrderComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        
            let tmporder=JSON.parse(localStorage.getItem("currentOrder"))
            if(tmporder!== undefined && tmporder!== null ){
                this.state = {
                    patients: [],
                    josyRealizujace: [],
                    pacjent: tmporder.pacjent,
                    pomiar: tmporder.pomiar,
                    josZamawiajacy: tmporder.josZamawiajacy,
                    josRealizujacy: tmporder.josRealizujacy,
                    dataNa: tmporder.dataNa,
                    dataZlecenia: tmporder.dataZlecenia,
                    rozpoznanie: tmporder.rozpoznanie,
                    typ: tmporder.typ,
                    status: tmporder.status,
                    josRealizujacyNazwa: tmporder.josRealizujacy.kod+' '+tmporder.josRealizujacy.nazwa,
                    josZamawiajacyNazwa: tmporder.josZamawiajacy.kod+' '+tmporder.josZamawiajacy.nazwa,
                    pacjentImieNazwisko: tmporder.pacjent.imiona+' '+tmporder.pacjent.nazwisko,
                    title: 'Zamówienie',
                    newActive:false,
                }
            }
            else{
                this.state = {
                    josyRealizujace: [],
                    patients: [],
                    pacjent: [],
                    pomiar: [],
                    josZamawiajacy: [],
                    josRealizujacy: [],
                    dataNa: new Date(),
                    dataZlecenia: new Date(),
                    rozpoznanie: '',
                    typ: '',
                    status: '',
                    josRealizujacyNazwa: '',
                    josZamawiajacyNazwa: '',
                    pacjentImieNazwisko:'',


                    title: 'Zamówienie',
                    newActive:false,
                }
            }

        this.props.title(this.state.title);  
        this.addStudy = this.addStudy.bind(this);
    }

    
    componentDidMount() {
        this._isMounted = true;
        this.load()


    }
    async load(){
        let joss;
        let patients;
            
        await PatientService.fetchPatients()
            .then(result =>{
                patients= result.data
                
            })

        await JosService.fetchJoss()
            .then(result =>{
                joss=result.data  
            })
        if(this._isMounted){
            this.setState({patients: patients,
                            josyRealizujace: joss})
        }
    }

    componentWillMount () {
        this._isMounted = false;
    }

    addStudy() {
        this.setState({newActive: true})
    }


    onChange = (e) =>{ this.setState({[e.target.name]: e.target.value})
    console.log([e.target.name])
    console.log(e.target.value)
        }
    ;

    updateStudy(){
        StudyService.fetchStudys(this.state.pacjent.id)
        .then(result =>{ this.setState({pomiar: result.data.sort((a, b) => {return new Date(b.dataPomiaru) - new Date(a.dataPomiaru)})[0],
                                        newActive:false})     
    });
    }



    render() {
        return (
            <div style={flexStyle}>
                <div component={Paper} style={{width:"100%", marginTop: '-20px'}}>
                <Typography variant="h6" fullwidth="true" align="left">Dane zamówienia:</Typography>    
                    <TextField variant="outlined" autoFocus select style={{width: '100%'}} label="Typ żywienia" margin="normal"
                            name="typ" value={this.state.typ} onChange={this.onChange} >
                                <MenuItem value={"DOU"}>Żywienie Doustne</MenuItem>
                                <MenuItem value={"DOJ"}>Żywienie Dojelitowe</MenuItem>
                    </TextField>

                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <DateTimePicker variant="inline" label="Data Zamówienia" name="dataZlecenia" ampm={false} inputVariant="outlined"
                            value={this.state.dataZlecenia} onChange={(date) => this.setState({dataZlecenia: new Date(date)})}
                            margin="normal" format="dd.MM.yyyy HH:mm" style={{width: '33%'}}
                        />

                        <Autocomplete
                            id="pacjenci"
                            options={this.state.patients}
                            name='pacjent'
                            value={this.state.pacjent}
                            getOptionLabel={option => option.imiona+ ' '+ option.nazwisko}
                            onChange={(event, value) => this.setState({pacjent: value})}
                            style={{  display:'inline'}}
                            margin= 'normal'
                            renderInput={params => (
                        <TextField variant="outlined" margin= 'normal' style={{width: '33%'}} {...params} 
                        label='Pacjent'  />
                        )}
                        />



                        <DateTimePicker variant="inline" label="Data Zapotrzebowania" name="dataNa" ampm={false} inputVariant="outlined"
                            value={this.state.dataNa} onChange={(date) => this.setState({dataNa: new Date(date)})}
                            margin="normal" format="dd.MM.yyyy HH:mm" style={{width: '33%'}}
                        />
                    </MuiPickersUtilsProvider>
                        <TextField variant="outlined" autoFocus type="text"  disabled style={{width: '33%'}}
                        label="Jednostka Zamawiająca" margin="normal" name="nazwisko" value={this.state.josZamawiajacyNazwa} onChange={this.onChange} />

                        <TextField variant="outlined" autoFocus type="text"  required style={{width: '33%'}}
                        label="Rozpoznanie" margin="normal" name="rozpoznanie" value={this.state.rozpoznanie} onChange={this.onChange} />

                        <Autocomplete
                            id="josRealizujacy"
                            options={this.state.josyRealizujace}
                            name='josRealizujacy'
                            value={this.state.josRealizujacy}
                            getOptionLabel={option => option.kod+ ' '+ option.nazwa}
                            onChange={(event, value) => this.setState({josRealizujacy: value})}
                            style={{  display:'inline'}}
                            margin= 'normal'
                            getOptionDisabled={option => option.rodzaj!=='APT'}
                            renderInput={params => (
                        <TextField variant="outlined" margin= 'normal' style={{width: '33%'}} {...params} 
                        label='Jednostka realizująca'  />
                        )}
                        />
                        
                        <Typography variant="h6" style={{width:'75%', display: 'inline-block'}} align='left'>Aktualny pomiar pacjenta:</Typography> 
                        <Button style={{width:'25%'}} variant="contained" color="primary" onClick={() => this.addStudy()}>Dodaj pomiar</Button>

                        {this.state.newActive && (
                            <div style={{width: '100%',marginBottom:'20px'}}>
                                <StudyComponent idPacjenta={this.state.pacjent.id} updateList={() => this.updateStudy()} />
                            </div>
                            )}
                        {!this.state.newActive && (
                          <div style={pomiarStyle} onClick={()=>alert('Domyślnie pobierany najnowższy pomiar dla pacjenta. Można go dodać w danych pacjenta')}>
                                <StudyComponent idPacjenta={this.state.pacjent.id} pomiar={this.state.pomiar} />
                        </div>
                        )}
                    <hr/>

                    <div style={{width: '50%'}}>
                        <OrderPosition typ={this.state.typ}/>
                    </div>




                </div>


            </div>                        

        )
        }
}
const pomiarStyle={
    width: '100%', 
    paddingTop: '10px',
   // border: '2px solid grey',  
    //borderRadius: '10px', 
    marginBottom:'20px',
    pointerEvents: 'none'
}

const iconStyle={
    clear: "both",
    transform: "scale(6)", 
    margin: "60px",
    float: 'left'
}

const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}

export default EditOrderComponent;