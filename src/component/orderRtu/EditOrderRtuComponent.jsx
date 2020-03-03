import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import OrderPositionRtuComponent from './OrderPositionRtuComponent';
import OrderPosRtuService from '../../_services/OrderPosRtuService';
import TableIngredientsRtuComponent from './TableIngredientsRtuComponent';
import OrderHeaderComponent from '../order/OrderHeaderComponent';
import TableHelpComponent from '../order/TableHelpComponent';








class EditOrderComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            if(localStorage.getItem("currentOrderRTU")!== 'null' && localStorage.getItem("currentOrderRTU")!==undefined ){
                this.state = JSON.parse(localStorage.getItem("currentOrderRTU"))
            }


        this.props.title(this.state.title);  
        this.addStudy = this.addStudy.bind(this);
        this.orderHeaderComponent = React.createRef();
    }

    
    componentDidMount() {
        this._isMounted = true;
        this.reloadOrderPos(); 
    }
    changeToEditOrder(){
        if(this.state.typ !== 'WOR'){
            let tmpOrder={
                id: this.state.id,
                pacjent: this.state.pacjent,
                pomiar: this.state.pomiar,
                josZamawiajacy: this.state.josZamawiajacy,
                josRealizujacy: this.state.josRealizujacy,
                dataNa: this.state.dataNa,
                dataZlecenia: this.state.dataZlecenia,
                rozpoznanie: this.state.rozpoznanie,
                typ: this.state.typ,
                status: this.state.status,
                }
            window.localStorage.setItem("currentOrder", JSON.stringify(tmpOrder));
            this.props.history.replace('/edit-order');
            }
    }

    componentDidUpdate(){
        this.changeToEditOrder()
    }

    componentWillMount () {
        this._isMounted = false;
    }

    saveOrder = () =>{
        this.orderHeaderComponent.current.saveOrder()
    }
    deleteOrder = () =>{
        this.orderHeaderComponent.current.deleteOrder()
    }

    addStudy() {
        this.setState({newActive: true})
    }

    updateOrder(order){
        this.setState({
            order: order,
            id: order.id,
            pacjent: order.pacjent,
            pomiar: order.pomiar,
            josZamawiajacy: order.josZamawiajacy,
            josRealizujacy: order.josRealizujacy,
            dataNa: order.dataNa,
            dataZlecenia: order.dataZlecenia,
            rozpoznanie: order.rozpoznanie,
            typ: order.typ,
            status: order.status
        })

    }

    onChange = (e) =>{ this.setState({[e.target.name]: e.target.value})};

    addOrderPos(){
        this.setState({newPosActive: true})
    }

     updateOrderPoss(){
         this.reloadOrderPos();
    }

    getSupply(supply){
        this.setState({supply: supply})
    }

     reloadOrderPos() {
        if(this.state.id!==''){
            OrderPosRtuService.fetchOrderPosRtus(this.state.id)
                .then(result =>{
                    if(result.data[0]!==undefined){
                    this.setState({orderPositions: result.data,
                                newPosActive:false,
                                headerState:'none'})}
                    else{
                    this.setState({orderPositions: result.data,
                        newPosActive:false,
                        headerState:'auto'})
                    }     
            });
        }
    }


    render() {
        return (
            <div style={flexStyle}>
                <div component={Paper} style={{width:"100%", marginTop: '-20px'}}>
                <div style={{pointerEvents: this.state.headerState}}>
                    <OrderHeaderComponent ref={this.orderHeaderComponent} history={this.props.history} updateOrder= {(order)=>this.updateOrder(order)} order={this.state.order} />
                </div>

                    <hr/>
                <div style={flexStyle}>

                    <div style={{width: '48%', marginRight:'2%'}}>
                    {this.state.newPosActive && (
                <div style={posStyle}>
                    <OrderPositionRtuComponent zamowienieId={this.state.id} typ={this.state.typ} 
                    getSupply={(supply) => this.getSupply(supply)} updateList={() => this.updateOrderPoss()} />
                </div>
                )}


                {this.state.orderPositions.map((row,index) => (
                    <div  key={row.id} style={posStyle}>
                    <OrderPositionRtuComponent key={row.id} typ={this.state.typ} pozycja={index+1} 
                    getSupply={(supply) => this.getSupply(supply)} updateList={() => this.updateOrderPoss()} orderPosRtu={row}/>
                    </div>

                ))}
                    </div>

                    <div style={{width: '48%', marginLeft:'2%'}}>
                    {this.state.orderPositions.length > 0 && 
                        <div style={posStyle}>
                            <TableIngredientsRtuComponent supply={this.state.supply} zamowienieId={this.state.id} pomiar= {this.state.pomiar} orderPos={this.state.orderPositions} typ={this.state.typ} updateList={() => this.updateOrderPoss()} />
                        </div>
                    }
                    </div>

                    </div>

                    <hr/>
                    <div >
                        {this.state.status!=='' &&
                            <TableHelpComponent pacjent={this.state.pacjent} pomiar={this.state.pomiar} />
                        }    
                        </div>
                    <hr/>
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status !== 'ZAP' || this.state.orderPositions[0] !== undefined} variant="contained" color="primary" onClick={() => this.addOrderPos()}>Dodaj worek</Button>
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.addStudy()}>Wyślij</Button>
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.headerState==='none'} variant="contained" color="secondary" onClick={this.deleteOrder}>Usuń Zamówienie</Button>                    
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.headerState==='none'} variant="contained" color="primary" onClick={this.saveOrder}>Zapisz nagłówek</Button>
                </div>


            </div>                        

        )
        }
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