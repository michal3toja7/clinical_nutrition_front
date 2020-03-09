import React, { Component } from 'react'
import OrderPosSuppService from "../../_services/OrderPosSuppService";
import SupplementService from "../../_services/SupplementService";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'


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
                error:null,
                isLoading: false,
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
                error:null,
                isLoading: false,
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
        if(this._isMounted){
            SupplementService.fetchSupplements()
            .then((result) =>{
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                    this.setState({
                    dodatki: result.data,
                    isLoading: false})
                }})
        }
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

        deleteOrderPosSupp = (e) => {
            e.preventDefault();
                if(this.state.id ===''){this.props.updateList();}
                else{            
                    OrderPosSuppService.deleteorderPosSupp(this.state.id)
                    .then(result => {
                        if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                        else{
                            this.props.updateList();
                        }
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


                    <Autocomplete id={"dodatek"+this.state.id} options={this.state.dodatki} name='dodatek' value={this.state.dodatek} 
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
}
const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap"
}

export default OrderPositionSuppComponent;