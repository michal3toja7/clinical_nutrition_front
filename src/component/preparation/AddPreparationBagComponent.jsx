import React, { Component } from 'react'
import PreparationBagService from "../../_services/PreparationBagService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'


class AddPreparationBagComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            error:null,
            isLoading: false,
            title: 'Edycja Worka',
            id: '',
            producent: '',	//Producent
            nazwa: '',	//Nazwa
            objetosc: '',	//Objętość
            aa: '',	//AA g
            azot: '',	//Azot g
            weglowodany: '',	//Węglowodany  (g)
            tluszcze: '',	//Tłuszcze g
            wartoscEnergetycznaCalkowita: '',	//Wartość energetyczna całkowita (kcal)
            wartoscEnergetycznaPozabialkowa: '',	//Wartość energetyczna pozabiałkowa (kcal)
            sod: '',	//Na (mmol)
            potas: '',	//K (mmol)
            magnez: '',	//Mg (mmol)
            wapn: '',	//Ca (mmol)
            fosforany: '',	//Fosforany(mmol)
            chlor: '',	//Cl (mmol)
            cynk: '',	//Cynk (mmol)
            octany: '',	//Octany
            sposobPodania: '',	//Sposób podania
            dipeptiven: '',	//Dipeptiven (ml)
            omegaven: '',	//Omegaven (ml)
            addamel: '',	//Addamel (ml)
            vitalipid: '',	//Vitalipid N Adult (ml)
            soluvit: '',	//Soluvit N (ml)
            sodMax: '',	//Na (mmol) MAX
            potasMax: '',	//K (mmol) MAX
            magnezMax: '',	//Mg (mmol) MAX
            wapnMax: '',	//Ca (mmol) MAX
            fosforanyMax: '',	//Fosforany(mmol) MAX
            chlorMax: '',	//Cl (mmol) MAX
            cynkMax: '',	//Cynk (mmol) MAX
            sodPotasMax: '',	//Na+K mmol MAX
            intralipid: '',	//Intralipid 20%/Smoflipid (Max ml)
            czyAktywny: true,
            message: null,
            fieldWidth :'48%'
        }
        this.props.title(this.state.title);
        this.savePreparationBag = this.savePreparationBag.bind(this);
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


    savePreparationBag = (e) => {
        e.preventDefault();
        let preparationBag = {
            id: this.state.id,
            producent: this.state.producent,	
            nazwa: this.state.nazwa,	
            objetosc: this.state.objetosc,	
            aa: this.state.aa,	
            azot: this.state.azot,	
            weglowodany: this.state.weglowodany,	
            tluszcze: this.state.tluszcze,	
            wartoscEnergetycznaCalkowita: this.state.wartoscEnergetycznaCalkowita,	
            wartoscEnergetycznaPozabialkowa: this.state.wartoscEnergetycznaPozabialkowa,	
            sod: this.state.sod,	
            potas: this.state.potas,	
            magnez: this.state.magnez,	
            wapn: this.state.wapn,	
            fosforany: this.state.fosforany,	
            chlor: this.state.chlor,	
            cynk: this.state.cynk,	
            octany: this.state.octany,	
            sposobPodania: this.state.sposobPodania,	
            dipeptiven: this.state.dipeptiven,	
            omegaven: this.state.omegaven,	
            addamel: this.state.addamel,	
            vitalipid: this.state.vitalipid,	
            soluvit: this.state.soluvit,	
            sodMax: this.state.sodMax,	
            potasMax: this.state.potasMax,	
            magnezMax: this.state.magnezMax,	
            wapnMax: this.state.wapnMax,	
            fosforanyMax: this.state.fosforanyMax,	
            chlorMax: this.state.chlorMax,	
            cynkMax: this.state.cynkMax,	
            sodPotasMax: this.state.sodPotasMax,	
            intralipid: this.state.intralipid,	
            czyAktywny: this.state.czyAktywny,
            };
        PreparationBagService.editPreparationBag(preparationBag)
            .then(result => {
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                    this.setState({message : 'Worek dodany z sukcesem.'});
                    this.props.history.push('/preparationBags');
                }
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
            <div>
                <form style={formContainer} component={Paper}>
                   <Typography variant="h6" fullwidth align="left">Dane:</Typography>                      
                        <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                        name="id" label="ID" value={this.state.id} onChange={this.onChange} style={{marginRight: "100%",minWidth: "200px"}}/>
                               
                        <TextField variant="outlined" autoFocus type="text" required  margin="normal" 
                        label="Producent" name="producent" value={this.state.producent} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus type="text" required  margin="normal" 
                        label="Nazwa" name="nazwa" value={this.state.nazwa} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus type="number" required  margin="normal" 
                        label="Objętość" name="objetosc" value={this.state.objetosc} onChange={this.onChange} style={fieldStyle.left}/>

                        <TextField variant="outlined" autoFocus type="number" required  margin="normal" 
                        label="Wartość energetyczna całkowita (kcal)" name="wartoscEnergetycznaCalkowita" 
                        value={this.state.wartoscEnergetycznaCalkowita} onChange={this.onChange} style={fieldStyle.right}/>

                        <TextField variant="outlined" autoFocus type="number" required  margin="normal" 
                        label="Wartość energetyczna pozabiałkowa (kcal)" name="wartoscEnergetycznaPozabialkowa" value={this.state.wartoscEnergetycznaPozabialkowa} 
                        onChange={this.onChange} style={fieldStyle.leftAlone}/>

                        <TextField variant="outlined" autoFocus fullWidth type="text"  required 
                        label="Sposób podania" margin="normal" name="sposobPodania" value={this.state.sposobPodania} onChange={this.onChange}/>

                        <Typography variant="h6" fullwidth align="left">Wartości odżywcze:</Typography>

                        <div style={flexStyle}>
                            <TextField variant="outlined" autoFocus required type="number" label="AA g" margin="normal"  
                            name='aa' value={this.state.aa} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Azot g" margin="normal"  
                            name='azot' value={this.state.azot} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Węglowodany  (g)" margin="normal"  
                            name='weglowodany' value={this.state.weglowodany} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Tłuszcze g" margin="normal"  
                            name='tluszcze' value={this.state.tluszcze} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Na (mmol)" margin="normal"  
                            name='sod' value={this.state.sod} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="K (mmol)" margin="normal"  
                            name='potas' value={this.state.potas} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Mg (mmol)" margin="normal"  
                            name='magnez' value={this.state.magnez} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Ca (mmol)" margin="normal"  
                            name='wapn' value={this.state.wapn} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Fosforany(mmol)" margin="normal"  
                            name='fosforany' value={this.state.fosforany} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Cl (mmol)" margin="normal"  
                            name='chlor' value={this.state.chlor} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Cynk (mmol)" margin="normal"  
                            name='cynk' value={this.state.cynk} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Octany" margin="normal"  
                            name='octany' value={this.state.octany} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Dipeptiven (ml)" margin="normal"  
                            name='dipeptiven' value={this.state.dipeptiven} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Omegaven (ml)" margin="normal"  
                            name='omegaven' value={this.state.omegaven} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Addamel (ml)" margin="normal"  
                            name='addamel' value={this.state.addamel} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Vitalipid N Adult (ml)" margin="normal"  
                            name='vitalipid' value={this.state.vitalipid} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus required type="number" label="Soluvit N (ml)" margin="normal"  
                            name='soluvit' value={this.state.soluvit} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus type="number" label="Na (mmol) MAX" margin="normal"  
                            name='sodMax' value={this.state.sodMax} onChange={this.onChange} style={fieldStyleFlex}/>

                            <TextField variant="outlined" autoFocus type="number" label="K (mmol) MAX" margin="normal"  
                            name='potasMax' value={this.state.potasMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Mg (mmol) MAX" margin="normal"  
                            name='magnezMax' value={this.state.magnezMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Ca (mmol) MAX" margin="normal"  
                            name='wapnMax' value={this.state.wapnMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Fosforany(mmol) MAX" margin="normal"  
                            name='fosforanyMax' value={this.state.fosforanyMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Cl (mmol) MAX" margin="normal"  
                            name='chlorMax' value={this.state.chlorMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Cynk (mmol) MAX" margin="normal"  
                            name='cynkMax' value={this.state.cynkMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Na+K mmol MAX" margin="normal"  
                            name='sodPotasMax' value={this.state.sodPotasMax} onChange={this.onChange} style={fieldStyleFlex}/>    

                            <TextField variant="outlined" autoFocus type="number" label="Intralipid 20%/Smoflipid (Max ml)" margin="normal"  
                            name='intralipid' value={this.state.intralipid} onChange={this.onChange} style={fieldStyleFlex}/>                

                        </div>

                        <FormControlLabel style= {fieldStyle.leftAlone} control={
                            <Checkbox onChange={this.onCheckboxChange} name="czyAktywny" checked={this.state.czyAktywny} value={this.state.czyAktywny} />    
                        }
                        label="Czy Aktywny"/>


                    <Button variant="contained" color="primary" onClick={this.savePreparationBag}>Zapisz</Button>

            </form>
    </div>
        );
    }
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

export default AddPreparationBagComponent;