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
import OrderPositionComponent from './OrderPositionComponent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import OrderService from '../../_services/OrderService';
import OrderPosService from '../../_services/OrderPosService';
import PositionTableComponent from './PositionTableComponent';


class EditOrderComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            if(localStorage.getItem("currentOrder")!== null && localStorage.getItem("currentOrder")!=='undefined' ){
                let tmporder=JSON.parse(localStorage.getItem("currentOrder"))
                this.state = {
                    id: tmporder.id,
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
                    title: 'Zamówienie',
                    newActive:false,
                    newPosActive:false,
                    orderPositions: [], 
                    headerState: 'auto'
                }
            }
            else{
                this.state = {
                    id: '',
                    josyRealizujace: [],
                    patients: [],
                    pacjent: [],
                    pomiar: [],
                    josZamawiajacy: JSON.parse(localStorage.getItem("currentJos")),
                    josRealizujacy: [],
                    dataNa: new Date(),
                    dataZlecenia: new Date(),
                    rozpoznanie: '',
                    typ: '',
                    status: '',
                    title: 'Zamówienie',
                    newActive:false,
                    newPosActive:false,
                    orderPositions: [],
                    headerState: 'auto'
                }
            }

        this.props.title(this.state.title);  
        this.addStudy = this.addStudy.bind(this);
        this.changePatient = this.changePatient.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
    }

    
    componentDidMount() {
        this._isMounted = true;
        this.load();
        this.reloadOrderList(); 


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

    addOrderPos(){
        this.setState({newPosActive: true})
    }
     updateOrders(){
         this.reloadOrderList();
    }


     reloadOrderList() {
        OrderPosService.fetchOrderPoss(this.state.id)
            .then(result =>{
                if(result.data[0]!==undefined){
                this.setState({orderPositions: result.data,
                               newPosActive:false,
                               headerState:'none'})}
                else{
                this.setState({headerState:'auto'})
                }     
        });
    }

    saveOrder = (e) => {
        let zamowienie={
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
        .then(result => {this.setState({
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
        window.localStorage.setItem("currentOrder", JSON.stringify(result.data));
        })
    }


    render() {
        return (
            <div style={flexStyle}>
                <div component={Paper} style={{width:"100%", marginTop: '-20px'}}>
                <div style={{pointerEvents: this.state.headerState}}>
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
                        <Button style={{width:'25%'}} disabled={this.state.status !== ''} variant="contained" color="primary" onClick={() => this.addStudy()}>Dodaj pomiar</Button>

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

                    <hr/>
                <div style={flexStyle}>

                    <div style={{width: '48%', marginRight:'2%'}}>
                    {this.state.newPosActive && (
                <div style={posStyle}>
                    <OrderPositionComponent zamowienieId={this.state.id} typ={this.state.typ} updateList={() => this.updateOrders()} />
                </div>
                )}


                {this.state.orderPositions.map((row,index) => (
                    <div  key={row.id} style={posStyle}>
                    <OrderPositionComponent key={row.id} typ={this.state.typ} pozycja={index+1} updateList={() => this.updateOrders()} orderPos={row}/>
                    </div>

                ))}
                    </div>

                    <div style={{width: '48%'}}>
                    {this.state.orderPositions.length > 0 && 
                        <div style={posStyle}>
                            <PositionTableComponent key={this.state.orderPositions.length} zamowienieId={this.state.id} orderPos={this.state.orderPositions} typ={this.state.typ} updateList={() => this.updateOrders()} />
                        </div>
                    }
                    </div>


                    </div>

                    <hr/>
                    <Button style={{width:'25%', margin:'3%'}} disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.addOrderPos()}>Dodaj preparat</Button>
                    <Button style={{width:'25%', margin:'3%'}} disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.addStudy()}>Wyślij</Button>
                    <Button style={{width:'25%', margin:'3%'}} variant="contained" color="primary" onClick={this.saveOrder}>Zapisz nagłówek</Button>
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
const posStyle={
    width: '100%',
    marginBottom:'20px', 
    border: '1px solid LightGray', 
    borderRadius: '10px', 
    padding: '5px',
}

const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}

export default EditOrderComponent;