import React, {Component} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from '@material-ui/core';


const standardyZywieniowe = [
    {
        wiek: 4,
        energiaOd: 75,
        energiaDo: 90,
        plynyOd: 80,
        plynyDo: 100,
        aaOd: 1.5,
        aaDo: 1.75,
        glukozaOd: 10,
        glukozaDo: 12,
        tluszczOd: 2,
        tluszczDo: 2.5,
        sodOd: 1,
        sodDo: 1.5,
        potasOd: 0.2,
        potasDo: 0.2,
        wapnOd: 0.2,
        wapnDo: 0.2,
        fosforOd: 0.2,
        fosforDo: 0.2,
        magnezOd: 0.1,
        magnezDo: 0.1
    },
    {
        wiek: 8,
        energiaOd: 60,
        energiaDo: 75,
        plynyOd: 60,
        plynyDo: 80,
        aaOd: 1.5,
        aaDo: 1.75,
        glukozaOd: 7,
        glukozaDo: 10,
        tluszczOd: 2,
        tluszczDo: 2.5,
        sodOd: 1,
        sodDo: 1,
        potasOd: 0.1,
        potasDo: 0.1,
        wapnOd: 0.2,
        wapnDo: 0.2,
        fosforOd: 0.1,
        fosforDo: 0.1,
        magnezOd: 0.1,
        magnezDo: 0.1
    },
    {
        wiek: 13,
        energiaOd: 30,
        energiaDo: 60,
        plynyOd: 50,
        plynyDo: 70,
        aaOd: 1,
        aaDo: 1.5,
        glukozaOd: 5,
        glukozaDo: 7,
        tluszczOd: 1.5,
        tluszczDo: 2,
        sodOd: 1,
        sodDo: 1,
        potasOd: 0.1,
        potasDo: 0.1,
        wapnOd: 0.2,
        wapnDo: 0.2,
        fosforOd: 0.1,
        fosforDo: 0.1,
        magnezOd: 0.1,
        magnezDo: 0.1
    },
    {
        wiek: 18,
        energiaOd: 25,
        energiaDo: 30,
        plynyOd: 30,
        plynyDo: 40,
        aaOd: 1,
        aaDo: 2,
        glukozaOd: 5,
        glukozaDo: 7,
        tluszczOd: 1,
        tluszczDo: 2,
        sodOd: 1,
        sodDo: 2,
        potasOd: 0.1,
        potasDo: 0.5,
        wapnOd: 0.1,
        wapnDo: 0.1,
        fosforOd: 0.1,
        fosforDo: 0.5,
        magnezOd: 0.1,
        magnezDo: 0.2
    },
    {
        wiek: 'FAT',
        energiaOd: 20,
        energiaDo: 25,
        plynyOd: 30,
        plynyDo: 40,
        aaOd: 1,
        aaDo: 2,
        glukozaOd: 5,
        glukozaDo: 7,
        tluszczOd: 1,
        tluszczDo: 2,
        sodOd: 1,
        sodDo: 2,
        potasOd: 0.1,
        potasDo: 0.5,
        wapnOd: 0.1,
        wapnDo: 0.1,
        fosforOd: 0.1,
        fosforDo: 0.5,
        magnezOd: 0.1,
        magnezDo: 0.2
    }
]


class TableHelpComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            pacjent: props.pacjent,
            pomiar: props.pomiar,
            wiek: ((new Date()).getFullYear() - (new Date(props.pacjent.dataUrodzenia)).getFullYear()),
            pokazPanel: 'block',
            pokazPrzycisk: 'none'
        }
    }


    componentDidMount() {
        this._isMounted = true;

    }

    calculate() {
    }

    //Wzór Harrisa Benedicta
    // 66,437+(13,752*Waga)+(5,003*Wzrost)-(6,755*Wiek) Mężczyzna
    // 655,096+(9,563*Waga)+(1,85*Wzrost)-(4,676*Wiek) Kobieta
    getWhb() {
        let wynik = 0
        if (this.state.pacjent.plec === 'M') {
            wynik = 66.437 + (13.752 * this.state.pomiar.waga) + (5.003 * this.state.pomiar.wzrost) - (6.755 * this.state.wiek)
        } else {
            wynik = 655.096 + (9.563 * this.state.pomiar.waga) + (1.85 * this.state.pomiar.wzrost) - (4.676 * this.state.wiek)
        }
        return Math.round(wynik)
    }

    getBmi() {
        return this.state.pomiar.waga / ((this.state.pomiar.wzrost / 100) * (this.state.pomiar.wzrost / 100))
    }

    getStandard(key) {
        let tmpWiek
        this.state.wiek > 18 ? tmpWiek = 18 : tmpWiek = this.state.wiek
        if (this.getBmi() >= 30) {
            return standardyZywieniowe.find(row => row.wiek >= 'FAT')[key] * this.state.pomiar.waga
        } else {
            return standardyZywieniowe.find(row => row.wiek >= tmpWiek)[key] * this.state.pomiar.waga
        }
    }

    getPlynyWgKcal() {
        return this.state.wiek < 18 ? (this.getWzorLonga() * 1.2) : this.getWzorLonga()
    }

    plynyWgWagi() {
        let plynyWgWagi = 0
        if (this.state.wiek < 18) {
            if (this.state.pomiar.waga < 10)
                plynyWgWagi = this.state.pomiar.waga * 100
            if (this.state.pomiar.waga > 10 && this.state.pomiar.waga < 20)
                plynyWgWagi = 1000 + (20 - this.state.pomiar.waga) * 50
            if (this.state.pomiar.waga > 20)
                plynyWgWagi = 1500 + (this.state.pomiar.waga - 20) * 20
        } else {
            plynyWgWagi = this.state.pomiar.waga * 30
        }
        return plynyWgWagi
    }

    /*          Aktywność:
                    LEZY = 1.0
                    CHODZI_PRZY_LOZKU = 1.1
                    PELNA_AKTYWNOSC = 1.2
                StanChorego:
                    NORMA = 1.0
                    SREDNIO_CIEZKI = 1.1
                    CIEZKI = 1.2  */
    getWzorLonga() {
        let wynik = this.getWhb()
        let aktywnosc = 0
        let stanChorego = 0
        let temperatura = this.state.pomiar.temperatura
        let temp
        switch (this.state.pomiar.stanChorego) {
            case 'NORMA':
                stanChorego = 1;
                break;
            case 'SREDNIO_CIEZKI':
                stanChorego = 1.1;
                break;
            case 'CIEZKI':
                stanChorego = 1.2;
                break;
            default:
                stanChorego = 1;
        }
        switch (this.state.pomiar.aktywnosc) {
            case 'LEZY':
                aktywnosc = 1;
                break;
            case 'CHODZI_PRZY_LOZKU':
                aktywnosc = 1.1;
                break;
            case 'PELNA_AKTYWNOSC':
                aktywnosc = 1.2;
                break;
            default:
                aktywnosc = 1;
        }
        switch (true) {
            case (temperatura <= 37.5):
                temp = 1;
                break;
            case (temperatura > 37.5 && temperatura <= 38.5):
                temp = 1.1;
                break;
            case (temperatura > 38.5 && temperatura <= 39.5):
                temp = 1.2;
                break;
            case (temperatura > 39.5):
                temp = 1.3;
                break;
            default:
                temp = 1;
        }
        wynik = wynik * aktywnosc * stanChorego * temp

        return Math.round(wynik)
    }

    componentDidpdate() {

    }

    componentWillMount() {
        this._isMounted = false;
    }

    onClick() {
        if (this.state.pokazPanel === 'none') {
            this.setState({
                pokazPanel: "block",
                pokazPrzycisk: "none"
            })
        } else {
            this.setState({
                pokazPanel: "none",
                pokazPrzycisk: "block"
            })
        }

    }


    render() {
        const panel = {
            position: "fixed",
            right: "0px",
            paddingTop: "10px",
            paddingBottom: "10px",
            top: "100px",
            width: "250px",
            display: this.state.pokazPanel,
            borderRadius: '10px',
            background: 'lightgrey',
            flexDirection: "row",
            alignItems: "streth",
            flexWrap: "wrap",
        }
        const przycisk = {
            position: "fixed",
            writingMode: "vertical-rl",
            textOrientation: "upright",
            right: "0px",
            paddingTop: "10px",
            paddingBottom: "10px",
            top: "100px",
            height: "600px",
            width: "30px",
            display: this.state.pokazPrzycisk,
            borderRadius: '10px',
            background: 'lightgrey',

        }
        return (

            <div>
                <div style={przycisk} onClick={() => this.onClick()}>
                    <Typography variant="body1" align="center"><b>TABELA ZAPOTRZEBOWAŃ</b></Typography>
                </div>

                <div style={panel} onClick={() => this.onClick()}>

                    <Typography variant="body1" align="center"><b>Zapotrzebowanie energetyczne
                        (kcal/dzień)</b></Typography>
                    <Table size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Wzór Harrisa Benedicta</TableCell>
                                <TableCell align='center'>{this.getWhb()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Wzór Longa</TableCell>
                                <TableCell align='center'>{this.getWzorLonga()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Standardy Żywieniowe</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('energiaOd')} - {this.getStandard('energiaDo')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="body1" align="center"><b>Podaż substancji organicznych
                        (g/dzień)</b></Typography>
                    <Table size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Aminokwasy</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('aaOd')} - {this.getStandard('aaDo')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Glukoza</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('glukozaOd')} - {this.getStandard('glukozaDo')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tłuszcze</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('tluszczOd')} - {this.getStandard('tluszczDo')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="body1" align="center"><b>Zapotrzebowanie na płyny (ml/dzień)</b></Typography>
                    <Table size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Według wagi</TableCell>
                                <TableCell align='center'>{this.plynyWgWagi()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Według kcal</TableCell>
                                <TableCell align='center'>{this.getPlynyWgKcal()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Standardy</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('plynyOd')} - {this.getStandard('plynyDo')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="body1" align="center"><b>Podaż makroskładników (mmol/dzień)</b></Typography>
                    <Table size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Na (sód)</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('sodOd')} - {this.getStandard('sodDo')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>K (potas)</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('potasOd')} - {this.getStandard('potasDo')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ca (wapń)</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('wapnOd')} - {this.getStandard('wapnDo')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>P (fosfor)</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('fosforOd')} - {this.getStandard('fosforDo')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mg (magnez)</TableCell>
                                <TableCell
                                    align='center'>{this.getStandard('magnezOd')} - {this.getStandard('magnezDo')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
            </div>

        )
    }
}


export default TableHelpComponent;