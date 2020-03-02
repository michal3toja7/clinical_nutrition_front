import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

const header=[    {nazwa: 'Aminokwasy (g)'},
{nazwa: 'Azot (g)'},
{nazwa: 'Glukoza (g)'},
{nazwa: 'Lipidy (g)'},
{nazwa: 'Energia Całkowita (kcal)'},
{nazwa: 'Energia Pozabiałkowa (kcal)'},]
 const zawartosc=[
    {nazwa: 'Aminokwasy (g)'},
    {nazwa: 'Azot (g)'},
    {nazwa: 'Glukoza (g)'},
    {nazwa: 'Lipidy (g)'},
    {nazwa: 'Energia Całkowita (kcal)'},
    {nazwa: 'Energia Pozabiałkowa (kcal)'},
 ]

 const elektrolity=[
    {nazwa: 'Na (mmol)'},
    {nazwa: 'K (mmol)'},
    {nazwa: 'Cl (mmol)'},
    {nazwa: 'Mg (mmol)'},
    {nazwa: 'Ca (mmol)'},
    {nazwa: 'P (mmol)'},
    {nazwa: 'Fe (mmol)'},
    {nazwa: 'Zn (mmol)'},
 ]

 const podazDoba=[
    {nazwa: 'Podaż na dobę'},
    {nazwa: 'Aminokwasy g/kg/doba'},
    {nazwa: 'Glukoza g/kg/doba'},
    {nazwa: 'Lipidy g/kg/doba'},
    {nazwa: 'Sód mmol/kg/doba'},
    {nazwa: 'Potas mmol/kg/doba'},
    {nazwa: 'Chlor mmol/kg/doba'},
    {nazwa: 'Magnez mmol/kg/doba'},
    {nazwa: 'Wapń mmol/kg/doba'},
    {nazwa: 'Fosfor mmol/kg/doba'},
    {nazwa: 'Żelazo mmol/kg/doba'},
    {nazwa: 'Cynk mmol/kg/doba'},
    {nazwa: 'Płyny ml/doba'},
 ]

class TableIngredientsComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            this.state = {
              prevProps: [],
              supply: [],
              table: JSON.parse(JSON.stringify(header)),
              mCa: 40.078,
              mCl: 35.453,
              mFe: 55.485,
              mK: 39.0983,
              mMg: 24.305,
              mNa: 22.98977,
              mP: 30.973761,
              mZn:65.38,
            }
        }
    
    componentDidMount() {
        this._isMounted = true;
        this.buildTable()

    }

    componentDidUpdate(){
        if(this.props !== this.state.prevProps){
           this.buildTable()
        }
                    
    }

    componentWillMount() {
        this._isMounted = false;
      }
      getSupplyData(nazwa){
          let suma=0
          this.props.supply.map(row => {
            suma+= row.ilosc*row.dodatek[nazwa]
            console.log(nazwa + ': ' +row.dodatek[nazwa])
          })
          return suma
      }

      buildTable(){
            let tmpWorek=this.props.orderPos[0].worekPreparat
           // const ileMl= (row.objetosc * Math.round(24/row.coIleH,0))/100
           let zawartosc=[
                {nazwa: 'Aminokwasy (g)', worek: tmpWorek.aa, dodatki: this.getSupplyData('aminokwasy')},
                {nazwa: 'Azot (g)', worek: tmpWorek.azot, dodatki: (this.getSupplyData('aminokwasy')/6.25)},
                {nazwa: 'Glukoza (g)', worek: tmpWorek.weglowodany, dodatki: this.getSupplyData('glukoza')},
                {nazwa: 'Lipidy (g)', worek: tmpWorek.tluszcze, dodatki: this.getSupplyData('tluszcz')},
                {nazwa: 'Energia Całkowita (kcal)', worek: tmpWorek.wartoscEnergetycznaCalkowita, dodatki: ((this.getSupplyData('aminokwasy')*4)
                                                                                    + (this.getSupplyData('glukoza')*3.4) +(this.getSupplyData('tluszcz')*9))},
                {nazwa: 'Energia Pozabiałkowa (kcal)', worek: tmpWorek.wartoscEnergetycznaPozabialkowa, dodatki: (this.getSupplyData('glukoza')*3.4) +(this.getSupplyData('tluszcz')*10)},
           ]
           //this.getSupplyData('potas')


           const elektrolity=[
            {nazwa: 'Na (mmol)', worek: tmpWorek.sod},
            {nazwa: 'K (mmol)', worek: tmpWorek.potas},
            {nazwa: 'Mg (mmol)', worek: tmpWorek.magnez},
            {nazwa: 'Ca (mmol)', worek: tmpWorek.wapn},
            {nazwa: 'P (mmol)', worek: tmpWorek.fosforany},
         ]
           console.log(this.props)

           /*
            tmpTable[0]['Preparat'+count]=row.preparat.bialko*ileMl                              // Aminokwasy (g)
            tmpTable[1]['Preparat'+count]=(row.preparat.bialko*ileMl)/6.25                       // Azot (g)
            tmpTable[2]['Preparat'+count]=row.preparat.weglowodany*ileMl                         // Glukoza (g)
            tmpTable[3]['Preparat'+count]=row.preparat.tluszcz*ileMl                             // Lipidy (g)
            tmpTable[4]['Preparat'+count]=row.preparat.blonnik*ileMl                             // Błonnik (g)
            tmpTable[5]['Preparat'+count]=row.preparat.wartoscEnergetyczna*ileMl*100             // Energia Całk (kcal)
      

   

          tmpTable.map(row =>{
            let suma=0
                Object.keys(row).map(col =>
                isNaN(row[col])? '': suma= suma+ row[col]
                )
            row['Suma']=suma
            })
*/
 //         if((JSON.stringify(this.state.table) !== JSON.stringify(tmpTable))){
              
                this.setState({
                    table: zawartosc,
                    prevProps: this.props,
               })
     //    }
      }



      





    render() {
        let suma=0
        return (
            <div style={flexStyle}>
                        <TableContainer component={Paper}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    {Object.keys(this.state.table[0]).map(col =>(
                                        <TableCell><b>{col==='nazwa'? 'Składniki/doba':col}</b></TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.table.map((row,index) => (
                                <TableRow hover key={row.nazwa+index}>
                                    {Object.keys(row).map(col =>(
                                        <TableCell>{isNaN(row[col]) || row[col]===''? row[col] : Math.round(100*row[col])/100}</TableCell>
                                    ))}
                                </TableRow> 
                            ))}
                                    </TableBody>
                                    </Table>
                                    </TableContainer>   



            </div>                        

        )
        }
}


const flexStyle={
    display: "flex",
    flexDirection: "row", 
    alignItems: "streth", 
    flexWrap: "wrap",
}

export default TableIngredientsComponent;