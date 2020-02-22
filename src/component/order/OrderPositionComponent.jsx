import React, { Component } from 'react'
import OrderPosService from "../../_services/OrderPosService";
import PreparationService from "../../_services/PreparationService";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';



class OrderPosition extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        if(props.orderPos!== undefined && props.orderPos!== null ){
            this.state = {
                saveIsActive: false,
                preparaty: [],
                id: this.props.orderPos.id,
                zamowienieId: this.props.orderPos.zamowienieId,
                preparat: this.props.orderPos.preparat,
                objetosc: this.props.orderPos.objetosc,
                coIleH: this.props.orderPos.coIleH,
                czasWlewu: this.props.orderPos.czasWlewu,
                sposobPodania: this.props.orderPos.sposobPodania,
                uwagi: this.props.orderPos.uwagi,
                newActive:false,
            }
        }
        else{
            this.state = {
                saveIsActive: true,
                preparaty: [],
                id:'',
                zamowienieId: this.props.zamowienieId,
                preparat: [],
                objetosc: '',
                coIleH: '',
                czasWlewu: '',
                sposobPodania: null,
                uwagi: '',
            }

        }


        this.addStudy = this.addStudy.bind(this);
        
    }

    
    componentDidMount() {
        this._isMounted = true;
        PreparationService.fetchPreparations()
        .then((result) =>{if(this._isMounted){
             this.setState({
             preparaty: result.data.filter((data) => data.typ.toLowerCase().includes(this.props.typ.toLowerCase())), })
             }})
    }

    componentWillMount() {
        this._isMounted = false;
      }





      saveOrderPos = (e) => {
        e.preventDefault();
        let orderPos= {}
        if(this.state.id ===''){
            orderPos = {

            zamowienieId: this.state.zamowienieId,
            preparat: this.state.preparat,
            objetosc: this.state.objetosc,
            coIleH: this.state.coIleH,
            czasWlewu: this.state.czasWlewu,
            sposobPodania: this.state.sposobPodania,
            uwagi: this.state.uwagi,
            }
        } else{
            orderPos = {
                id: this.state.id,
                zamowienieId: this.state.zamowienieId,
                preparat: this.state.preparat,
                objetosc: this.state.objetosc,
                coIleH: this.state.coIleH,
                czasWlewu: this.state.czasWlewu,
                sposobPodania: this.state.sposobPodania,
                uwagi: this.state.uwagi,
                }
            }

            OrderPosService.addOrderPos(orderPos)
            .then(res => {
                this.setState({message : 'Pozycję zedytowany z sukcesem.',
                               saveIsActive: false});
                this.props.updateList();
            });
    }

        deleteOrderPos = (e) => {
            e.preventDefault();
                if(this.state.id ===''){}
                else{            
                    OrderPosService.deleteOrderPos(this.state.id)
                    .then(res => {
                        this.props.updateList();
                    });
                }
        }



    addStudy() {
        this.setState({newActive: true})
    }

    onChange = (e) =>{ this.setState({[e.target.name]: e.target.value,
                                      saveIsActive: true})};


    render() {
        return (
            <div style={flexStyle}>
                <div component={Paper} style={{width:"100%", textB: 'white'}}>
                <Typography variant="h6" fullwidth="true" align="left">Preparat {this.props.pozycja}:</Typography>    

                    <Autocomplete id="preparat" options={this.state.preparaty} name='preparat' value={this.state.preparat} getOptionLabel={option => (option.nazwa+'')}
                        onChange={(event, value) => this.setState({preparat: value})} style={{  display:'inline'}} margin= 'dense' 

                        renderInput={params => (
                                <TextField variant="outlined" margin= 'dense' style={{width: '100%'}} {...params} 
                                label='Preparat'  />
                        )}/>

                    <TextField variant="outlined" autoFocus type="number"  required style={{width: '50%'}}
                        label="Objętość (ml)" margin="dense" name="objetosc" value={this.state.objetosc} onChange={this.onChange} />

                    <TextField variant="outlined" autoFocus type="number"  required style={{width: '50%'}}
                        label="Co ile Godzin (h)" margin="dense" name="coIleH" value={this.state.coIleH} onChange={this.onChange} />

                    <TextField variant="outlined" autoFocus type="number"  required style={{width: '50%'}}
                        label="Ilość podań na dobę" disabled margin="dense" name="ilePodan" value={Math.round(24/this.state.coIleH,0)} onChange={this.onChange} />   

                    <TextField variant="outlined" disabled autoFocus type="number"  required style={{width: '50%'}}
                        label="Ilość ml na dobę" margin="dense" name="iloscMl" value={this.state.objetosc * Math.round(24/this.state.coIleH,0)} onChange={this.onChange} />
                    {this.props.typ === 'DOJ' && (
                        <div>
                            <TextField variant="outlined" autoFocus type="text" style={{width: '50%'}}
                                label="Czas wlewu (h)" margin="dense" name="czasWlewu" value={this.state.czasWlewu} onChange={this.onChange} /> 

                            <TextField variant="outlined" autoFocus type="text"  disabled style={{width: '50%'}}
                                label="Szybkość przetaczania ml/h" margin="dense" name="uwagi" value={this.state.objetosc/this.state.czasWlewu} onChange={this.onChange} /> 

                            <TextField variant="outlined" autoFocus select style={{width: '100%'}} label="Sposób podania" margin="dense"
                                    name="sposobPodania" value={this.state.sposobPodania} onChange={this.onChange} >
                                        <MenuItem value={"WLC"}>Wlew ciągły</MenuItem>
                                        <MenuItem value={"BOL"}>Bolus</MenuItem>
                                        <MenuItem value={"WLK"}>Wlew kroplowy {Math.ceil((this.state.objetosc/this.state.czasWlewu)/3,0)} kropli/min</MenuItem>
                            </TextField>
                        </div>
                    )}

                    <TextField variant="outlined" autoFocus type="text"  style={{width: '100%'}}
                        label="Uwagi" margin="dense" name="uwagi" value={this.state.uwagi} onChange={this.onChange} /> 

                {this.state.saveIsActive && (<Button style={{width: '48%',marginRight:'2%'}} onClick={this.saveOrderPos} variant="contained" color="primary">Zapisz</Button>)}
                {this.state.saveIsActive && (<Button style={{width: '48%',marginLeft: '2%'}} onClick={this.deleteOrderPos} variant="contained" color="secondary">Usuń</Button>)}               




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
    marginBottom:'20px'
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

export default OrderPosition;