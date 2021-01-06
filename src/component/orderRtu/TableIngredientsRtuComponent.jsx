import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';


class TableIngredientsComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            prevProps: [],
            supply: [],
            podazDoba: [],
            elektrolity: [],
            zawartosc: [],
            mCa: 40.078,
            mCl: 35.453,
            mFe: 55.485,
            mK: 39.0983,
            mMg: 24.305,
            mNa: 22.98977,
            mP: 30.973761,
            mZn: 65.38,
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

    getSupplyData(nazwa) {
        let suma = 0
        this.props.supply.map(row => {
            suma += row.ilosc * row.dodatek[nazwa]
        })
        return suma
    }

    sumTabble(tmpTable) {
        tmpTable.map(row => {
            let suma = 0
            Object.keys(row).map(col =>
                isNaN(row[col]) ? '' : suma = suma + row[col]
            )
            row['Suma'] = suma
        })
        tmpTable[0].Suma = 'Suma'
        return tmpTable
    }

    getSupplySum() {
        let suma = this.props.orderPos[0].worekPreparat.objetosc
        this.props.supply.map(row => {
            suma += row.ilosc

        })
        return suma
    }


    buildTable() {
        const waga = this.props.pomiar.waga
        let tmpWorek = this.props.orderPos[0].worekPreparat
        let zawartosc = [
            {nazwa: 'Zawartość:', worek: 'Worek', dodatki: 'Dodatki'},
            {nazwa: 'Aminokwasy (g)', worek: tmpWorek.aa, dodatki: this.getSupplyData('aminokwasy')},
            {nazwa: 'Azot (g)', worek: tmpWorek.azot, dodatki: (this.getSupplyData('aminokwasy') / 6.25)},
            {nazwa: 'Glukoza (g)', worek: tmpWorek.weglowodany, dodatki: this.getSupplyData('glukoza')},
            {nazwa: 'Lipidy (g)', worek: tmpWorek.tluszcze, dodatki: this.getSupplyData('tluszcz')},
            {
                nazwa: 'Energia Całkowita (kcal)',
                worek: tmpWorek.wartoscEnergetycznaCalkowita,
                dodatki: ((this.getSupplyData('aminokwasy') * 4)
                    + (this.getSupplyData('glukoza') * 3.4) + (this.getSupplyData('tluszcz') * 9))
            },
            {
                nazwa: 'Energia Pozabiałkowa (kcal)',
                worek: tmpWorek.wartoscEnergetycznaPozabialkowa,
                dodatki: (this.getSupplyData('glukoza') * 3.4) + (this.getSupplyData('tluszcz') * 10)
            },
            {nazwa: 'Płyny (ml)', worek: tmpWorek.objetosc, dodatki: this.getSupplyData('glukoza')},
        ]
        zawartosc = this.sumTabble(zawartosc)


        let elektrolity = [
            {nazwa: 'Elektrolity:', worek: 'Worek', dodatki: 'Dodatki'},
            {nazwa: 'Na (mmol)', worek: tmpWorek.sod, dodatki: this.getSupplyData('sod')},
            {nazwa: 'K (mmol)', worek: tmpWorek.potas, dodatki: this.getSupplyData('potas')},
            {nazwa: 'Mg (mmol)', worek: tmpWorek.magnez, dodatki: this.getSupplyData('magnez')},
            {nazwa: 'Ca (mmol)', worek: tmpWorek.wapn, dodatki: this.getSupplyData('wapn')},
            {nazwa: 'P (mmol)', worek: tmpWorek.fosforany, dodatki: this.getSupplyData('fosfor')},
        ]
        elektrolity = this.sumTabble(elektrolity)

        let podazDoba = [
            {nazwa: 'Podaż na dobę', wynik: 'Na dobę:'},
            {nazwa: 'Aminokwasy g/kg/doba', wynik: zawartosc[1].Suma / waga},
            {nazwa: 'Glukoza g/kg/doba', wynik: zawartosc[3].Suma / waga},
            {nazwa: 'Lipidy g/kg/doba', wynik: zawartosc[4].Suma / waga},
            {nazwa: 'Sód mmol/kg/doba', wynik: elektrolity[1].Suma / waga},
            {nazwa: 'Potas mmol/kg/doba', wynik: elektrolity[2].Suma / waga},
            {nazwa: 'Magnez mmol/kg/doba', wynik: elektrolity[3].Suma / waga},
            {nazwa: 'Wapń mmol/kg/doba', wynik: elektrolity[4].Suma / waga},
            {nazwa: 'Fosfor mmol/kg/doba', wynik: elektrolity[5].Suma / waga},
            {nazwa: 'Płyny ml/doba', wynik: this.getSupplySum()},
        ]


        this.props.getTableIngredients({podazDoba, elektrolity, zawartosc})
        this.setState({
            podazDoba: podazDoba,
            elektrolity: elektrolity,
            zawartosc: zawartosc,
            prevProps: this.props,
        })

    }


    renderTable(table) {
        if (table[0] === undefined)
            return false
        return (
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            {Object.keys(table[0]).map(col => (
                                <TableCell><b>{table[0][col]}</b></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.slice(1).map((row, index) => (
                            <TableRow hover key={row.nazwa + index}>
                                {Object.keys(row).map(col => (
                                    <TableCell>{isNaN(row[col]) || row[col] === '' ? row[col] : Math.round(100 * row[col]) / 100}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }


    render() {
        return (
            <div style={flexStyle}>
                <div style={{width: '100%', marginBottom: '40px'}}>
                    {this.renderTable(this.state.zawartosc)}
                </div>
                <div style={{width: '100%', marginBottom: '40px'}}>
                    {this.renderTable(this.state.elektrolity)}
                </div>
                <div style={{width: '100%', marginBottom: '40px'}}>
                    {this.renderTable(this.state.podazDoba)}
                </div>
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