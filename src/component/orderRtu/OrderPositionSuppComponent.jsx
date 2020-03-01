import React, { Component } from 'react'
import OrderPosSuppService from "../../_services/OrderPosSuppService";
import SupplementService from "../../_services/SupplementService";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';

const resetTimeout = (id, newID) => {	
	clearTimeout(id)
	return newID	
}

class OrderPositionSuppComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        if(props.orderPosSupp!== undefined && props.orderPosSupp!== null ){
            this.state = {
                saveIsActive: false,
                dodatki: [],
                id: this.props.orderPosSupp.id,
                zamowieniePozRtuId: this.props.orderPosSupp.zamowieniePozRtuId,
                dodatek: this.props.orderPosSupp.dodatek,
                ilosc: this.props.orderPosSupp.ilosc,
                newActive:false,
            }
        }
        else{
            this.state = {
                saveIsActive: true,
                dodatki: [],
                id: '',
                zamowieniePozRtuId: this.props.zamowieniePozRtuId,
                dodatek: [],
                ilosc: '',
            }

        }


        this.addStudy = this.addStudy.bind(this);
        
    }

    
    componentDidMount() {
        this._isMounted = true;
        SupplementService.fetchSupplements()
        .then((result) =>{if(this._isMounted){
             this.setState({
             dodatki: result.data})
             }})
    }

    componentWillMount() {
        this._isMounted = false;
      }





      saveOrderPosSupp = () => {
        let orderPosSupp= {}
        if(this.state.id ===''){
            orderPosSupp = {
                zamowieniePozRtuId: this.state.zamowieniePozRtuId,
                dodatek: this.state.dodatek,
                ilosc: this.state.ilosc,
                timeout: null,
            }
        } else{
            orderPosSupp = {
                id: this.state.id,
                zamowieniePozRtuId: this.state.zamowieniePozRtuId,
                dodatek: this.state.dodatek,
                ilosc: this.state.ilosc,
                timeout: null,
                }
            }

            OrderPosSuppService.addorderPosSupp(orderPosSupp)
            .then(res => {
                this.setState({message : 'Pozycję zedytowany z sukcesem.',
                               saveIsActive: false});
                this.props.updateList();
            });
   
        }

        deleteOrderPosSupp = (e) => {
            e.preventDefault();
                if(this.state.id ===''){this.props.updateList();}
                else{            
                    OrderPosSuppService.deleteorderPosSupp(this.state.id)
                    .then(res => {
                        this.props.updateList();
                    });
                }
        }


    addStudy() {
        this.setState({newActive: true})
    }

    onChange = (name,value) =>{     
                            if(this.state.dodatek.nazwa!== undefined && this.state.ilosc !== ''){
                                this.setState({[name]: value,
                                            saveIsActive: true,
                                            timeout: resetTimeout(this.state.timeout, setTimeout(this.saveOrderPosSupp, 1000))
                                            })
                            } else {
                                this.setState({[name]: value,
                                                saveIsActive: true
                                                })
                            }
                        };




    render() {
        return (
            <div style={flexStyle}>
                <div component={Paper} style={{width:"100%", textB: 'white'}}>


                    <Autocomplete id="dodatek" options={this.state.dodatki} name='dodatek' value={this.state.dodatek} 
                        getOptionLabel={option => (option.nazwa+'')}
                        onChange={(event, value) => this.onChange('dodatek',value)} style={{  display:'inline'}} margin= 'dense' 

                        renderInput={params => (
                                <TextField variant="outlined" margin= 'dense' style={{width: '50%', marginRight: '2%'}} {...params} 
                                label='Dodatek'  />
                        )}/>

                        <TextField variant="outlined" autoFocus type="number" style={{width: '30%', marginLeft: '2%'}}
                        label="Ilość (ml)" margin="dense" name="ilosc" value={this.state.ilosc} onChange={(e) => this.onChange(e.target.name,e.target.value)}/> 

                        <Button style={{width: '2%', marginLeft: '4%'}}  margin="dense" onClick={this.deleteOrderPosSupp}  color="secondary"><DeleteIcon/></Button>
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

export default OrderPositionSuppComponent;