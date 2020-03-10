import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import OrderPositionComponent from './OrderPositionComponent';
import OrderPosService from '../../_services/OrderPosService';
import TableIngredientsComponent from './TableIngredientsComponent';
import TableSupplyComponent from './TableSupplyComponent';
import OrderHeaderComponent from './OrderHeaderComponent';
import TableHelpComponent from './TableHelpComponent';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'
import OrderPdf from '../pdf/OrderPdf'




let tableIngredients;
class EditOrderComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            if(sessionStorage.getItem("currentOrder")!== 'null' && sessionStorage.getItem("currentOrder")!==undefined ){
                let tmporder=JSON.parse(sessionStorage.getItem("currentOrder"))
                this.state = {
                    error:null,
                    isLoading: true,
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
                    headerState: 'auto',
                    supply: [],
                    isJosRealizujacy: JSON.stringify(tmporder.josRealizujacy)=== JSON.parse(JSON.stringify(sessionStorage.getItem("currentJos"))),
                    isPrintReady: false,
                    tableIngerients: [],
                }
            }
            else{
                this.state = {
                    error:null,
                    isLoading: false,
                    id: '',
                    order:[],
                    pacjent: [],
                    pomiar: [],
                    josZamawiajacy: JSON.parse(sessionStorage.getItem("currentJos")),
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
                    headerState: 'auto',
                    supply: [],
                    isJosRealizujacy: false,
                    tableIngredients: [],
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

    changeToEditOrderRtu(){
        if(this.state.typ==='WOR'){
            window.sessionStorage.setItem("currentOrderRTU",JSON.stringify(this.state))
            this.props.history.replace('/edit-orderRtu');
        }
    }
    
    componentDidUpdate(){
        this.changeToEditOrderRtu();
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
    getTableIngredients(argstableIngredients){
        tableIngredients = argstableIngredients
        // if(this.state.tableIngerients !== tableIngredients)
         //   this.setState({tableIngredients: tableIngredients})
        //console.log(tableIngredients)
    }
    print(){
        this.setState({isPrintReady: true})
    }


     reloadOrderPos() {
        if(this.state.id!==''){
            OrderPosService.fetchOrderPoss(this.state.id)
                .then(result =>{
                    if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                    else{
                        if(result.data[0]!==undefined){
                        this.setState({orderPositions: result.data,
                                    newPosActive:false,
                                    isLoading: false,
                                    headerState:'none'})}
                        else{
                        this.setState({orderPositions: result.data,
                            isLoading: false,
                            headerState:'auto'})
                        }  
                    }   
            });
        }
    }
    changeStatus(status){
        this.orderHeaderComponent.current.saveOrder(status);
    }


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
                            <TableIngredientsComponent key={this.state.orderPositions.length} getTableIngredients={(tableIngredients) => this.getTableIngredients(tableIngredients)} zamowienieId={this.state.id} 
                            orderPos={this.state.orderPositions} typ={this.state.typ} updateList={() => this.updateOrderPoss()} />
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
                        {this.state.status!=='' &&
                            <TableHelpComponent pacjent={this.state.pacjent} pomiar={this.state.pomiar} />
                        }
                        </div>
                        
                    <hr/>
                    {this.state.isJosRealizujacy && (
                        <div>
                            <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status !== 'WYS'} variant="contained" color="primary" onClick={() => this.changeStatus('REA')}>Przyjmij zamówienie</Button>
                            
                            <Button style={{width:'23%', margin:'1%', display: this.state.status === 'ZRE' ? "inline": "none" }} variant="contained" color="primary" onClick={() => this.changeStatus('REA')}>Wycofaj realizację</Button>

                            <Button style={{width:'23%', margin:'1%', display: this.state.status !== 'ZRE' ? "inline": "none" }}
                                disabled={this.state.status !== 'REA'} variant="contained" color="primary" onClick={() => this.changeStatus('ZRE')}>Zakończ realizację</Button>

                            <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status === 'ZRE'} variant="contained" color="secondary" onClick={() => this.changeStatus('ANU')}>Anuluj zamówienie</Button>
                            <Button style={{width:'23%', margin:'1%', display: this.state.isPrintReady ? "none" : "inline"}} disabled= {false} variant="contained" color="primary" onClick={() => this.print()}> Drukuj</Button>      
                            {this.state.isPrintReady&& (
                              <Button style={{width:'23%', margin:'1%'}} disabled= {false} variant="contained" color="primary" onClick={() => this.print()}>
                                <OrderPdf tableIngredients={tableIngredients} order={this.state.order} positions={this.state.orderPositions} />
                              </Button>    
                            )}
                        </div>
                    )}
                    {!this.state.isJosRealizujacy && (
                        <div>
                            <Button style={{width:'23%', margin:'1%'}} disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.addOrderPos()}>Dodaj preparat</Button>
                            <Button style={{width:'23%', margin:'1%', display: this.state.status === '' || this.state.status === 'ZAP'  ? "inline": "none" }} 
                                disabled={this.state.status !== 'ZAP'} variant="contained" color="primary" onClick={() => this.changeStatus('WYS')}>Wyślij</Button>
                            <Button style={{width:'23%', margin:'1%', display: this.state.status !== '' && this.state.status !== 'ZAP'  ? "inline": "none"}}
                                disabled={this.state.status !== 'WYS'} variant="contained" color="primary" onClick={() => this.changeStatus('ZAP')}>Wycofaj</Button>
                            <Button style={{width:'23%', margin:'1%'}} disabled={this.state.headerState==='none'} variant="contained" color="secondary" onClick={this.deleteOrder}>Usuń Zamówienie</Button>                    
                            <Button style={{width:'23%', margin:'1%'}} disabled={this.state.headerState==='none'} variant="contained" color="primary" onClick={this.saveOrder}>Zapisz nagłówek</Button>
                        </div>
                    )}
                
                    </div>


            </div>                        

        )
        }
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