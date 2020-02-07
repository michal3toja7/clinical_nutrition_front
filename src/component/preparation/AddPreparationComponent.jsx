import React, { Component } from 'react'
import PreparationService from "../../_services/PreparationService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class AddPreparationComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            title: 'Edycja Preparatu',
            id:'',
            nazwa: '',
            typ: '',
            opis: '',
            wartoscEnergetyczna: '',
            bialko: '',
            weglowodany: '',
            tluszcz: '',
            blonnik: '',
            osmolarnosc: '',
            sod: '',
            potas: '',
            chlor: '',
            wapn: '',
            magnez: '',
            fosfor: '',
            zelazo: '',
            cynk: '',
            czyAktywny: true,
            message: null,
            fieldWidth :'48%'
        }
        this.props.title(this.state.title);
        this.savePreparation = this.savePreparation.bind(this);
    }
    
    componentDidMount(){
        var screenWidth= window.innerWidth;
        if(screenWidth<600){
            this.setState({fieldWidth: '100%' }) 
        }
        else{
            this.setState({fieldWidth: '48%' }) 
        }

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value }           
            );

    onCheckboxChange = (e) =>
    this.setState({ [e.target.name]: e.target.checked }
        );


    savePreparation = (e) => {
        e.preventDefault();
        let preparation = {
            id: this.state.id,
            nazwa: this.state.nazwa,
            typ: this.state.typ,
            opis: this.state.opis,
            wartoscEnergetyczna: this.state.wartoscEnergetyczna,
            bialko: this.state.bialko,
            weglowodany: this.state.weglowodany,
            tluszcz: this.state.tluszcz,
            blonnik: this.state.blonnik,
            osmolarnosc: this.state.osmolarnosc,
            sod: this.state.sod,
            potas: this.state.potas,
            chlor: this.state.chlor,
            wapn: this.state.wapn,
            magnez: this.state.magnez,
            fosfor: this.state.fosfor,
            zelazo: this.state.zelazo,
            cynk: this.state.cynk,
            czyAktywny: this.state.czyAktywny
            };
        PreparationService.addPreparation(preparation)
            .then(res => {
                this.setState({message : 'Preparat dodany z sukcesem.'});
                this.props.history.push('/preparations');
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
                   <Typography variant="h6" fullwidth align="left">Dane:</Typography>                      
                        <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                        name="id" label="ID" value={this.state.id} onChange={this.onChange} style={{marginRight: "100%",minWidth: "200px"}}/>
                               
                        <TextField variant="outlined" autoFocus type="text" required  margin="normal" 
                        label="Nazwa" name="nazwa" value={this.state.nazwa} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus required select label="Typ" margin="normal"
                        name="typ" value={this.state.typ} onChange={this.onChange} style={fieldStyle.right}>
                            <MenuItem value={"DOJ"}>Dojelitowy</MenuItem>
                            <MenuItem value={"DOU"}>Doustny</MenuItem>
                        </TextField>

                        <TextField variant="outlined" autoFocus fullWidth type="text"  required 
                        label="Opis" margin="normal" name="opis" value={this.state.opis} onChange={this.onChange}/>

                        <Typography variant="h6" fullwidth align="left">Wartości odżywcze:</Typography>

                        <div style={flexStyle}>

                            <TextField variant="outlined" autoFocus required type="number" label="Wartość Energetyczna (kcal/ 1ml)" margin="normal"  
                            name='wartoscEnergetyczna' value={this.state.wartoscEnergetyczna} onChange={this.onChange} style={fieldStyleFlex}/>
    
                            <TextField variant="outlined" autoFocus required type="number" label="Białko [g/100ml]" margin="normal"  
                            name='bialko' value={this.state.bialko} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Węglowodany [g/100ml]" margin="normal"  
                            name='weglowodany' value={this.state.weglowodany} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Tłuszcz [g/100ml]" margin="normal"  
                            name='tluszcz' value={this.state.tluszcz} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Błonnik [g/100ml]" margin="normal"  
                            name='blonnik' value={this.state.blonnik} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Osmolarność [mOsm/l]" margin="normal"  
                            name='osmolarnosc' value={this.state.osmolarnosc} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Sód [mg/100ml]" margin="normal"  
                            name='sod' value={this.state.sod} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Potas [mg/100ml]" margin="normal"  
                            name='potas' value={this.state.potas} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Chlor [mg/100ml]" margin="normal"  
                            name='chlor' value={this.state.chlor} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Wapń [mg/100ml]" margin="normal"  
                            name='wapn' value={this.state.wapn} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Magnez [mg/100ml]" margin="normal"  
                            name='magnez' value={this.state.magnez} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Fosfor [mg/100ml]" margin="normal"  
                            name='fosfor' value={this.state.fosfor} onChange={this.onChange} style={fieldStyleFlex}/>
                            
                            <TextField variant="outlined" autoFocus required type="number" label="Żelazo [mg/100ml]" margin="normal"  
                            name='zelazo' value={this.state.zelazo} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Cynk [mg/100ml]" margin="normal"  
                            name='cynk' value={this.state.cynk} onChange={this.onChange} style={fieldStyleFlex}/>

                        </div>

                        <FormControlLabel style= {fieldStyle.leftAlone} control={
                            <Checkbox onChange={this.onCheckboxChange} name="czyAktywny" checked={this.state.czyAktywny} value={this.state.czyAktywny} />    
                        }
                        label="Czy Aktywny"/>


                    <Button variant="contained" color="primary" onClick={this.savePreparation}>Zapisz</Button>

            </form>
    </div>
        );
    }
}

const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}
const fieldStyleFlex={
    width:"30%",
    margin: "1.5%"
}
const formContainer = {
    //  display: '',
      flexFlow: 'row wrap'
  };

export default AddPreparationComponent;