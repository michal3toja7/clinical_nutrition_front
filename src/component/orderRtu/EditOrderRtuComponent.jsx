import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import OrderPositionComponent from './OrderPositionComponent';
import OrderPosService from '../../_services/OrderPosService';
import TableIngredientsComponent from './TableIngredientsComponent';
import TableSupplyComponent from './TableSupplyComponent';
import OrderHeaderComponent from './OrderHeaderComponent';
import TableHelpComponent from './TableHelpComponent';








class EditOrderComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            if(localStorage.getItem("currentOrder")!== 'null' && localStorage.getItem("currentOrder")!==undefined ){
                let tmporder=JSON.parse(localStorage.getItem("currentOrder"))
                this.state = {
                    order: tmporder,
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
        this.orderHeaderComponent = React.createRef();
    }

    
    componentDidMount() {
        this._isMounted = true;
        this.reloadOrderPos(); 
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


     reloadOrderPos() {
        if(this.state.id!==''){
            OrderPosService.fetchOrderPoss(this.state.id)
                .then(result =>{
                    if(result.data[0]!==undefined){
                    this.setState({orderPositions: result.data,
                                newPosActive:false,
                                headerState:'none'})}
                    else{
                    this.setState({orderPositions: result.data,
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
                    <OrderPositionComponent zamowienieId={this.state.id} typ={this.state.typ} updateList={() => this.updateOrderPoss()} />
                </div>
                )}


                {this.state.orderPositions.map((row,index) => (
                    <div  key={row.id} style={posStyle}>
                    <OrderPositionComponent key={row.id} typ={this.state.typ} pozycja={index+1} updateList={() => this.updateOrderPoss()} orderPos={row}/>
                    </div>

                ))}
                    </div>

                    <div style={{width: '48%', marginLeft:'2%'}}>
                    {this.state.orderPositions.length > 0 && 
                        <div style={posStyle}>
                            <TableIngredientsComponent key={this.state.orderPositions.length} zamowienieId={this.state.id} orderPos={this.state.orderPositions} typ={this.state.typ} updateList={() => this.updateOrderPoss()} />
                        </div>
                    }
                    </div>

                    <div style={{width: '100%'}}>
                    {this.state.orderPositions.length > 0 && 
                        <div style={posStyle}>
                            <TableSupplyComponent key={this.state.orderPositions.length} zamowienieId={this.state.id} pomiar={this.state.pomiar} orderPos={this.state.orderPositions} typ={this.state.typ} updateList={() => this.updateOrderPoss()} />
                        </div>
                    }
                    </div>

                    </div>

                    <hr/>
                    <div >
                            <TableHelpComponent pacjent={this.state.pacjent} pomiar={this.state.pomiar} />
                        </div>
                    <hr/>
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.addOrderPos()}>Dodaj preparat</Button>
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.addStudy()}>Wyślij</Button>
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.headerState==='none'} variant="contained" color="secondary" onClick={this.deleteOrder}>Usuń Zamówienie</Button>                    
                    <Button style={{width:'23%', margin:'1%'}} disabled={this.state.headerState==='none'} variant="contained" color="primary" onClick={this.saveOrder}>Zapisz nagłówek</Button>
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