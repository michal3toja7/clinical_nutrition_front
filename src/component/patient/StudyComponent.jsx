import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,DateTimePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import StudyService from '../../_services/StudyService';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'


class StudyComponent extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        if(props.pomiar!== undefined && props.pomiar!== null ){
            this.state = {
                error:null,
                isLoading: false,
                saveIsActive: false,
                id: props.pomiar.id,
                idPacjenta: props.pomiar.idPacjenta,
                waga: props.pomiar.waga,
                wzrost: props.pomiar.wzrost,
                temperatura: props.pomiar.temperatura,
                aktywnosc: props.pomiar.aktywnosc,
                stanChorego: props.pomiar.stanChorego,
                dataPomiaru: props.pomiar.dataPomiaru,
                message: null,
            }
        } else{
            this.state = {
                error:null,
                isLoading: false,
                id: '',
                saveIsActive: true,
                idPacjenta: props.idPacjenta,
                waga: '',
                wzrost:'',
                temperatura: '',
                aktywnosc: '',
                stanChorego: '',
                dataPomiaru: new Date(),
                message: null,
            }
        }
        this.saveStudy = this.saveStudy.bind(this);
        this.deleteStudy = this.deleteStudy.bind(this);
    }

    saveStudy = (e) => {
        e.preventDefault();
        let study= {}
        if(this.state.id ===''){
        study = {
            idPacjenta: this.state.idPacjenta,
            waga: this.state.waga,
            wzrost: this.state.wzrost,
            temperatura: this.state.temperatura,
            aktywnosc: this.state.aktywnosc,
            stanChorego: this.state.stanChorego,
            dataPomiaru: this.state.dataPomiaru,
            }
        } else{
            study = {
                id: this.state.id,
                idPacjenta: this.state.idPacjenta,
                waga: this.state.waga,
                wzrost: this.state.wzrost,
                temperatura: this.state.temperatura,
                aktywnosc: this.state.aktywnosc,
                stanChorego: this.state.stanChorego,
                dataPomiaru: this.state.dataPomiaru,
                }
            }

            StudyService.addStudy(study)
            .then(result => {
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                this.setState({message : 'Pomiar zedytowany z sukcesem.',
                               saveIsActive: false});
                this.props.updateList();
                }
            });
    }

        deleteStudy = (e) => {
            e.preventDefault();
                if(this.state.id ===''){}
                else{            
                    StudyService.deleteStudy(this.state.id)
                    .then(result => {
                        if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                        else{
                        this.setState({message : 'Pomiar usunięto z sukcesem.',
                                    saveIsActive: false});
                        this.props.updateList();
                        }
                    });
                }
        }


        componentDidUpdate(){
            if(this.props.pomiar!==undefined){
            if(this.props.pomiar.id !== this.state.id){
                this.setState({
                    saveIsActive: false,
                    id: this.props.pomiar.id,
                    idPacjenta: this.props.pomiar.idPacjenta,
                    waga: this.props.pomiar.waga,
                    wzrost: this.props.pomiar.wzrost,
                    temperatura: this.props.pomiar.temperatura,
                    aktywnosc: this.props.pomiar.aktywnosc,
                    stanChorego: this.props.pomiar.stanChorego,
                    dataPomiaru: this.props.pomiar.dataPomiaru,
                    })
            }
        }
        }


    onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value,
                    saveIsActive: true })};

render(){
    if(this.state.error!== null  || this.state.isLoading){
        return(
            <div>
                {(this.state.isLoading
                ? <LoadingComponent/>
                : <ErrorComponent error={this.state.error} history={this.props.history}/>
                )}
            </div>
        );
    }
    else{
    return (
        <div style={flexStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <DateTimePicker
                        variant="inline" 
                        label="Data Pomiaru"
                        name="dataPomiaru"
                        ampm={false}
                        inputVariant="outlined"
                        value={this.state.dataPomiaru}
                        onChange={(date) => this.setState({dataPomiaru: new Date(date),
                                                            saveIsActive: true})}
                        format="dd.MM.yyyy HH:mm"
                        fullWidth
                        style={{margin: "0.5%"}}
                        
                    />
            </MuiPickersUtilsProvider>

            <TextField variant="outlined" autoFocus required type="number" label="Waga" margin="normal"  
            name='waga' value={this.state.waga} onChange={this.onChange} style={fieldStyleFlex}/>

            <TextField variant="outlined" autoFocus required type="number" label="Wzrost" margin="normal"  
            name='wzrost' value={this.state.wzrost} onChange={this.onChange} style={fieldStyleFlex}/>

            <TextField variant="outlined" autoFocus required type="number" label="Temperatura" margin="normal"  
            name='temperatura' value={this.state.temperatura} onChange={this.onChange} style={fieldStyleFlex}/>

            <TextField variant="outlined" autoFocus required select label="Stan Chorego" margin="normal"
            name="stanChorego" value={this.state.stanChorego} onChange={this.onChange} style={fieldStyleFlex}>
                        <MenuItem value={"NORMA"}>Normalny</MenuItem>
                        <MenuItem value={"SREDNIO_CIEZKI"}>Średnio Ciężki</MenuItem>
                        <MenuItem value={"CIEZKI"}>Ciężki</MenuItem>

                    </TextField>
            <TextField variant="outlined" autoFocus required select label="Aktywność" margin="normal"
            name="aktywnosc" value={this.state.aktywnosc} onChange={this.onChange} style={fieldStyleFlex}>
                <MenuItem value={"LEZY"}>Leży</MenuItem>
                <MenuItem value={"CHODZI_PRZY_LOZKU"}>Chodzi przy Łóżku</MenuItem>
                <MenuItem value={"PELNA_AKTYWNOSC"}>Pełna Aktywność</MenuItem>
            </TextField>
            {this.state.saveIsActive && (<Button style={fieldStyleFlex} onClick={this.saveStudy} variant="contained" color="primary">Zapisz</Button>)}
            {this.state.saveIsActive && (<Button style={fieldStyleFlex} onClick={this.deleteStudy} variant="contained" color="secondary">Usuń</Button>)}
            
        </div>


    );
    }
}
}
const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap",
}
const fieldStyleFlex={
    width:"19%",
    margin: "0.5%"
}

export default StudyComponent;