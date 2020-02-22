import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';


const header=[
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


class TableSupplyComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            this.state = {
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

    componentDidpdate(){
        this.buildTable()
        
    }

    componentWillMount() {
        this._isMounted = false;
      }

      buildTable(){
          let tmpTable= JSON.parse(JSON.stringify(header))
          let count=1;        
          this.props.orderPos.map(row =>{
            const ileMl= (row.objetosc * Math.round(24/row.coIleH,0))/100
            tmpTable[0]['Preparat'+count]=row.preparat.nazwa                                                                           //Nagłówek
            tmpTable[1]['Preparat'+count]=(row.preparat.bialko*ileMl)/this.props.pomiar.waga                              // Aminokwasy g/kg/doba
            tmpTable[2]['Preparat'+count]=(row.preparat.weglowodany*ileMl)/this.props.pomiar.waga                       // Glukoza g/kg/doba
            tmpTable[3]['Preparat'+count]=(row.preparat.tluszcz*ileMl)/this.props.pomiar.waga                        // Lipidy g/kg/doba
            tmpTable[4]['Preparat'+count]=((row.preparat.sod*ileMl)/this.state.mNa)/this.props.pomiar.waga                              // Sód mmol/kg/doba
            tmpTable[5]['Preparat'+count]=((row.preparat.potas*ileMl)/this.state.mK)/this.props.pomiar.waga                             // Potas mmol/kg/doba
            tmpTable[6]['Preparat'+count]=((row.preparat.chlor*ileMl)/this.state.mCl)/this.props.pomiar.waga             // Chlor mmol/kg/doba
            tmpTable[7]['Preparat'+count]=((row.preparat.magnez*ileMl)/this.state.mMg)/this.props.pomiar.waga                                                    // Magnez mmol/kg/doba
            tmpTable[8]['Preparat'+count]=((row.preparat.wapn*ileMl)/this.state.mCa)/this.props.pomiar.waga                                 // Wapń mmol/kg/doba
            tmpTable[9]['Preparat'+count]=((row.preparat.fosfor*ileMl)/this.state.mP)/this.props.pomiar.waga                               // Fosfor mmol/kg/doba
            tmpTable[10]['Preparat'+count]=((row.preparat.zelazo*ileMl)/this.state.mFe)/this.props.pomiar.waga                              // Żelazo mmol/kg/doba
            tmpTable[11]['Preparat'+count]=((row.preparat.cynk*ileMl)/this.state.mZn)/this.props.pomiar.waga                            // Cynk mmol/kg/doba
            tmpTable[12]['Preparat'+count]=row.objetosc                               // Płyny ml/kg/doba
       

            count ++
          })

          tmpTable.map(row =>{
            let suma=0
                Object.keys(row).map(col =>
                isNaN(row[col])? '': suma= suma+ row[col]
                )
            row['Suma']=suma
            })
            tmpTable[0]['Suma'] = 'Suma'
          if((JSON.stringify(this.state.table) !== JSON.stringify(tmpTable))){
                this.setState({
                    table: tmpTable
                })
          }
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
                                        <TableCell><b>{this.state.table[0][col]}</b></TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.table.slice(1).map((row,index) => (
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

export default TableSupplyComponent;