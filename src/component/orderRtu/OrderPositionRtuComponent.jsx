import React, { Component } from 'react'
import OrderPosRtuService from "../../_services/OrderPosRtuService";
import PreparationBagService from "../../_services/PreparationBagService";
import OrderPosSuppService from "../../_services/OrderPosSuppService";
import OrderPositionSuppComponent from './OrderPositionSuppComponent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { wait } from '@testing-library/react';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'



class OrderPosRtuitionRtuComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        if(props.orderPosRtu!== undefined && props.orderPosRtu!== null ){
            this.state = {
                error:null,
                isLoading: true,
                saveIsActive: false,
                worki: [],
                dodatki: [],
                id: this.props.orderPosRtu.id,
                zamowienieId: this.props.orderPosRtu.zamowienieId,
                typZywienia: this.props.orderPosRtu.typZywienia,
                worekPreparat: this.props.orderPosRtu.worekPreparat,
                czasWlewu: this.props.orderPosRtu.czasWlewu,
                uwagi: this.props.orderPosRtu.uwagi,
                newActive:false,
            }
        }
        else{
            this.state = {
                error:null,
                isLoading: false,
                saveIsActive: true,
                worki: [],
                dodatki: [],
                id: '',
                zamowienieId: this.props.zamowienieId,
                typZywienia: 'CAL',
                worekPreparat: [],
                czasWlewu: '',
                uwagi: '',
                newActive: false,
            }

        }
    }

    
    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted){
            this.reloadOrderSupp();
            PreparationBagService.fetchPreparationBags()
            .then((result) =>{
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                    this.setState({
                    worki: result.data,
                    isLoading: false})
                }})
        }
    }

    componentWillMount() {
        this._isMounted = false;
      }





      saveOrderPosRtu = (e) => {
        let orderPosRtu= {}
        if(this.state.id ===''){
            orderPosRtu = {

            zamowienieId: this.state.zamowienieId,
            worekPreparat: this.state.worekPreparat,
            typZywienia: this.state.typZywienia,
            czasWlewu: this.state.czasWlewu,
            uwagi: this.state.uwagi,
            }
        } else{
            orderPosRtu = {
                id: this.state.id,
                zamowienieId: this.state.zamowienieId,
                worekPreparat: this.state.worekPreparat,
                typZywienia: this.state.typZywienia,
                czasWlewu: this.state.czasWlewu,
                uwagi: this.state.uwagi,
                }
            }

            OrderPosRtuService.addOrderPosRtu(orderPosRtu)
            .then(result => {
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                this.setState({message : 'Pozycję zedytowany z sukcesem.',
                               saveIsActive: false,
                               isLoading: false});
                this.props.updateList();
                }
            });
    }

        async deleteAllSupply(dodatek){
            await OrderPosSuppService.deleteorderPosSupp(dodatek.id)
            .then(result =>{
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                wait(100)
                }})
        }

        deleteOrderPosRtu = (e) =>{
            e.preventDefault();
                if(this.state.id ===''){this.props.updateList();}
                else{            
                    for(const dodatek in this.state.dodatki){
                        this.deleteAllSupply(this.state.dodatki[dodatek])
                    }
                    OrderPosRtuService.deleteOrderPosRtu(this.state.id)
                    .then(result => {
                        if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                        else{
                        this.props.updateList();
                        }
                    });
                }
        }

        reloadOrderSupp() {
            if(this.state.id!==''){
                OrderPosSuppService.fetchorderPosSupps(this.state.id)
                    .then(result =>{
                        if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                        else{
                            if(result.data[0]!==undefined){
                            this.setState({dodatki: result.data.sort((a,b) => a.dodatek.nazwa.localeCompare(b.dodatek.nazwa)),
                                        newActive:false})
                            this.props.getSupply(result.data)}
                            else{
                            this.setState({dodatki: result.data,
                                            newActive:false})
                            }     
                        }
                });
            }
        }



    addSupplement() {
        this.setState({newActive: true})
    }

    onChange = (e) =>{ this.setState({[e.target.name]: e.target.value,
                                      saveIsActive: true})};


    render() {
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
                <div component={Paper} style={{width:"100%", textB: 'white'}}>
                <Typography variant="h6" fullwidth="true" align="left">Worek:</Typography>  

                    <TextField variant="outlined" autoFocus select style={{width: '100%'}} label="Typ Żywienia" margin="dense"
                                    name="typZywienia" value={this.state.typZywienia} onChange={this.onChange} >
                                        <MenuItem value={"CAL"}>Żywienie całkowite</MenuItem>
                                        <MenuItem value={"CZE"}>Żywienie częściowe</MenuItem>
                                        <MenuItem value={"IMM"}>Żywienie immunomodulujące</MenuItem>
                    </TextField>


                    <Autocomplete id="worekPreparat" options={this.state.worki} name='worekPreparat' value={this.state.worekPreparat} 
                        getOptionLabel={option => (option.nazwa+' '+ option.objetosc+' ml')}
                        onChange={(event, value) => this.setState({worekPreparat: value,
                                                                   saveIsActive: true})} style={{  display:'inline'}} margin= 'dense' 

                        renderInput={params => (
                                <TextField variant="outlined" margin= 'dense' style={{width: '100%'}} {...params} 
                                label='Worek RTU'  />
                        )}/>

                        <TextField variant="outlined" autoFocus type="number" style={{width: '100%'}}
                        label="Czas wlewu (h)" margin="dense" name="czasWlewu" value={this.state.czasWlewu} onChange={this.onChange} /> 
                        <hr/>

                        
                        {this.state.dodatki.map((row,index) => (
                            <div  key={row.id} >
                            <OrderPositionSuppComponent key={row.id} updateList={() => this.reloadOrderSupp()} orderPosSupp={row}/>
                            </div>

                        ))}
                        <div>
                        {this.state.newActive && (
                        <div>
                            <OrderPositionSuppComponent zamowieniePozRtuId={this.state.id} updateList={() => this.reloadOrderSupp()} />
                        </div>
                        )}
                        </div>






                        
                        <Button style={{width: '50%', marginInline: '50%'}} disabled={this.state.id === ''} onClick={() => this.addSupplement()} variant="contained" color="primary">Dodaj dodatek</Button>
                        <hr/>

                        <TextField variant="outlined" autoFocus type="text"  style={{width: '100%'}}
                        label="Uwagi" margin="dense" name="uwagi" value={this.state.uwagi} onChange={this.onChange} /> 


                    
                {this.state.saveIsActive && (<Button style={{width: '48%',marginRight:'2%'}} onClick={this.saveOrderPosRtu} variant="contained" color="primary">Zapisz</Button>)}
                {this.state.saveIsActive && (<Button style={{width: '48%',marginLeft: '2%'}} onClick={this.deleteOrderPosRtu} variant="contained" color="secondary">Usuń</Button>)}               




                </div>


            </div>                        

        )
        }
        }
}

const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}

export default OrderPosRtuitionRtuComponent;