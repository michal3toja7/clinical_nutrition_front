import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';


const header = [
    {nazwa: 'Składniki/doba'},
    {nazwa: 'Aminokwasy (g)'},
    {nazwa: 'Azot (g)'},
    {nazwa: 'Glukoza (g)'},
    {nazwa: 'Lipidy (g)'},
    {nazwa: 'Błonnik (g)'},
    {nazwa: 'Energia Całkowita (kcal)'},
    {nazwa: ''},
    {nazwa: 'Na (mg)'},
    {nazwa: 'K (mg)'},
    {nazwa: 'Cl (mg)'},
    {nazwa: 'Mg (mg)'},
    {nazwa: 'Ca (mg)'},
    {nazwa: 'P (mg)'},
    {nazwa: 'Fe (mg)'},
    {nazwa: 'Zn (mg)'},
    {nazwa: ''},
    {nazwa: 'Na (mmol)'},
    {nazwa: 'K (mmol)'},
    {nazwa: 'Cl (mmol)'},
    {nazwa: 'Mg (mmol)'},
    {nazwa: 'Ca (mmol)'},
    {nazwa: 'P (mmol)'},
    {nazwa: 'Fe (mmol)'},
    {nazwa: 'Zn (mmol)'},
]


class TableIngredientsComponent extends Component {
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
            mZn: 65.38,
            prevProps: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.buildTable()

    }


    componentDidUpdate() {
        if (this.props !== this.state.prevProps) {
            this.buildTable()
        }

    }

    componentWillMount() {
        this._isMounted = false;
    }

    buildTable() {
        let tmpTable = JSON.parse(JSON.stringify(header))
        let count = 1;
        this.props.orderPos.map(row => {
            const ileMl = (row.objetosc * Math.round(24 / row.coIleH, 0)) / 100
            tmpTable[0]['Preparat' + count] = 'Preparat ' + count
            tmpTable[1]['Preparat' + count] = row.preparat.bialko * ileMl      // Aminokwasy (g)
            tmpTable[2]['Preparat' + count] = (row.preparat.bialko * ileMl) / 6.25           // Azot (g)
            tmpTable[3]['Preparat' + count] = row.preparat.weglowodany * ileMl // Glukoza (g)
            tmpTable[4]['Preparat' + count] = row.preparat.tluszcz * ileMl     // Lipidy (g)
            tmpTable[5]['Preparat' + count] = row.preparat.blonnik * ileMl     // Błonnik (g)
            tmpTable[6]['Preparat' + count] = row.preparat.wartoscEnergetyczna * ileMl * 100 // Energia Całk (kcal)
            tmpTable[7]['Preparat' + count] = ''    // 
            tmpTable[8]['Preparat' + count] = row.preparat.sod * ileMl         // Na (mg)
            tmpTable[9]['Preparat' + count] = row.preparat.potas * ileMl       // K (mg)
            tmpTable[10]['Preparat' + count] = row.preparat.chlor * ileMl       // Cl (mg)
            tmpTable[11]['Preparat' + count] = row.preparat.magnez * ileMl     // Mg (mg)
            tmpTable[12]['Preparat' + count] = row.preparat.wapn * ileMl       // Ca (mg)
            tmpTable[13]['Preparat' + count] = row.preparat.fosfor * ileMl     // P (mg)
            tmpTable[14]['Preparat' + count] = row.preparat.zelazo * ileMl     // Fe (mg)
            tmpTable[15]['Preparat' + count] = row.preparat.cynk * ileMl       // Zn (mg)
            tmpTable[16]['Preparat' + count] = ''   // 
            tmpTable[17]['Preparat' + count] = (row.preparat.sod * ileMl) / this.state.mNa   // Na (mmol)
            tmpTable[18]['Preparat' + count] = (row.preparat.potas * ileMl) / this.state.mK  // K (mmol)
            tmpTable[19]['Preparat' + count] = (row.preparat.chlor * ileMl) / this.state.mCl // Cl (mmol)
            tmpTable[20]['Preparat' + count] = (row.preparat.magnez * ileMl) / this.state.mMg// Mg (mmol)
            tmpTable[21]['Preparat' + count] = (row.preparat.wapn * ileMl) / this.state.mCa  // Ca (mmol)
            tmpTable[22]['Preparat' + count] = (row.preparat.fosfor * ileMl) / this.state.mP // P (mmol)
            tmpTable[23]['Preparat' + count] = (row.preparat.zelazo * ileMl) / this.state.mFe// Fe (mmol)
            tmpTable[24]['Preparat' + count] = (row.preparat.cynk * ileMl) / this.state.mZn  // Zn (mmol)         


            return count++
        })

        tmpTable.map(row => {
            let suma = 0
            Object.keys(row).map(col =>
                isNaN(row[col]) ? '' : suma = suma + row[col]
            )
            row['Suma'] = suma
        })
        tmpTable[0]['Suma'] = 'Suma'

        this.props.getTableIngredients(tmpTable)

        this.setState({
            table: tmpTable,
            prevProps: this.props,
        })
    }


    render() {
        return (
            <div style={flexStyle}>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                {Object.keys(this.state.table[0]).map(col => (
                                    <TableCell><b>{this.state.table[0][col]}</b></TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.table.slice(1).map((row, index) => (
                                <TableRow hover key={row.nazwa + index}>
                                    {Object.keys(row).map(col => (
                                        <TableCell>{isNaN(row[col]) || row[col] === '' ? row[col] : Math.round(100 * row[col]) / 100}</TableCell>
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


const flexStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "streth",
    flexWrap: "wrap",
}

export default TableIngredientsComponent;