import React, { Component } from 'react'
import JosService from "../../_services/JosService";
import StudyService from "../../_services/StudyService";
import PatientService from "../../_services/PatientService";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,DateTimePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import StudyComponent from '../patient/StudyComponent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import OrderService from '../../_services/OrderService';




class OrderHeaderComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            if(props.order!== null && props.order!==undefined ){
                this.state = {
                    order: props.order,
                    id: props.order.id,
                    patients: [],
                    josyRealizujace: [],
                    pacjent: props.order.pacjent,
                    pomiar: props.order.pomiar,
                    josZamawiajacy: props.order.josZamawiajacy,
                    josRealizujacy: props.order.josRealizujacy,
                    dataNa: props.order.dataNa,
                    dataZlecenia: props.order.dataZlecenia,
                    rozpoznanie: props.order.rozpoznanie,
                    typ: props.order.typ,
                    status: props.order.status,
                    title: 'Zamówienie',
                    newActive:false,
                    newPosActive:false,
                    orderPositions: [], 
                    headerState: 'auto'
                }
            }
            else{
                this.state = {
                    order: props.order,
                    id: '',
                    josyRealizujace: [],
                    patients: [],
                    pacjent: [],
                    pomiar: [{id:'',idPacjenta:'', waga: '', wzrost: '', temperatura:'', aktywnosc:'', stanChorego: ''}],
                    josZamawiajacy: JSON.parse(localStorage.getItem("currentJos")),
                    josRealizujacy: [],
                    dataNa: new Date(),
                    dataZlecenia: new Date(),
                    rozpoznanie: '',
                    typ: '',
                    status: '',
                    title: 'Zamówienie',
                    newActive:true,
                    newPosActive:false,
                    orderPositions: [],
                    headerState: 'auto'
                }
            }

        this.addStudy = this.addStudy.bind(this);
        this.changePatient = this.changePatient.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
    }

    



    componentWillMount () {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.load();
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




    addStudy() {
        this.setState({newActive: true})
    }


    onChange = (e) =>{ this.setState({[e.target.name]: e.target.value})};

    updateStudy(){
        StudyService.fetchStudys(this.state.pacjent.id)
        .then(result =>{
            if(result.data[0]!== undefined){
            this.setState({pomiar: result.data.sort((a, b) => {return new Date(b.dataPomiaru) - new Date(a.dataPomiaru)})[0],
                                        newActive:false})     
            } else{
                this.setState({newActive:true})
            }
    });
    }

    changePatient(choosePatient){
        StudyService.fetchStudys(choosePatient.id)
        .then(result =>{
            if(result.data[0]!== undefined){
            this.setState({ pacjent: choosePatient,
                            pomiar: result.data.sort((a, b) => {return new Date(b.dataPomiaru) - new Date(a.dataPomiaru)})[0],
                            newActive:false})     
            } else{
                this.setState({pacjent: choosePatient,
                               pomiar: [],
                               newActive:true})
            }
    });
    }




    saveOrder = (e) => {

        let zamowienie={
                    id: this.state.id,
                    pacjent: this.state.pacjent,
                    pomiar: this.state.pomiar,
                    josZamawiajacy: this.state.josZamawiajacy,
                    josRealizujacy: this.state.josRealizujacy,
                    dataNa: this.state.dataNa,
                    dataZlecenia: this.state.dataZlecenia,
                    rozpoznanie: this.state.rozpoznanie,
                    typ: this.state.typ,
                    status: 'ZAP'
        }
        OrderService.addOrder(zamowienie)
        .then(result => {
            console.log(result.data)
            this.props.updateOrder(result.data);
            window.localStorage.setItem("currentOrder", JSON.stringify(result.data));
            this.setState({
                order: result.data.order,
                id: result.data.id,
                pacjent: result.data.pacjent,
                pomiar: result.data.pomiar,
                josZamawiajacy: result.data.josZamawiajacy,
                josRealizujacy: result.data.josRealizujacy,
                dataNa: result.data.dataNa,
                dataZlecenia: result.data.dataZlecenia,
                rozpoznanie: result.data.rozpoznanie,
                typ: result.data.typ,
                status: result.data.status
            })
        })
    }
    deleteOrder = (e) => {
            if(this.state.id ===''){this.props.history.goBack()}
            else{            
                OrderService.deleteOrder(this.state.id)
                .then(res => {  this.props.history.goBack()});
            }
    }
    


    render() {
        return (
                <div>
                <Typography variant="h4" style={{marginLeft: '25%',width:'50%', display: 'inline-block'}}  align="center">Nagłówek zamówienia</Typography>  
                    <TextField variant="outlined" disabled select style={{width: '25%'}} label="Status zamówienia" 
                                name="typ" value={this.state.status} >
                                    <MenuItem value={''}>Nie zapisane</MenuItem>
                                    <MenuItem value={"ZAP"}>Zapisane</MenuItem>
                                    <MenuItem value={"WYS"}>Wysłane</MenuItem>
                                    <MenuItem value={"REA"}>Realizowane</MenuItem>
                                    <MenuItem value={"ZRE"}>Zrealizowane</MenuItem>
                                    <MenuItem value={"ANU"}>Anulowane</MenuItem>
                        </TextField>  

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
                            disableClearable
                            value={this.state.pacjent}
                            getOptionLabel={option => option.imiona+ ' '+ option.nazwisko}
                            onChange={(event, value) => this.changePatient(value)}
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
                        label="Jednostka Zamawiająca" margin="normal" name="nazwisko" value={this.state.josZamawiajacy.nazwa} onChange={this.onChange} />

                        <TextField variant="outlined" autoFocus type="text"  required style={{width: '33%'}}
                        label="Rozpoznanie" margin="normal" name="rozpoznanie" value={this.state.rozpoznanie} onChange={this.onChange} />

                        <Autocomplete
                            id="josRealizujacy"
                            options={this.state.josyRealizujace}
                            name='josRealizujacy'
                            disableClearable
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
                                <StudyComponent idPacjenta={this.state.pacjent.id} updateList={() => this.updateStudy(this.state.pacjent.id)} />
                            </div>
                            )}
                        {!this.state.newActive && (
                          <div style={pomiarStyle} onClick={()=>alert('Domyślnie pobierany najnowższy pomiar dla pacjenta. Można go dodać w danych pacjenta')}>
                                <StudyComponent idPacjenta={this.state.pacjent.id} pomiar={this.state.pomiar} />
                        </div>
                        )}
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

const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}

export default OrderHeaderComponent;