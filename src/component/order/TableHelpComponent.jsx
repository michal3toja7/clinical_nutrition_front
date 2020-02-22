import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';




class TableHelpComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
            this.state = {
                pacjent: props.pacjent,
                pomiar: props.pomiar,
                wiek:((new Date()).getFullYear() - (new Date(props.pacjent.dataUrodzenia)).getFullYear())
            }
        }
        
    
    componentDidMount() {
        this._isMounted = true;

    }

    calculate(){
    }
        //Wzór Harrisa Benedicta    
        // 66,437+(13,752*Waga)+(5,003*Wzrost)-(6,755*Wiek) Mężczyzna
        // 655,096+(9,563*Waga)+(1,85*Wzrost)-(4,676*Wiek) Kobieta
    whb(){      
        let wynik =0
        if(this.state.pacjent.plec === 'M'){
            wynik = 66.437+(13.752*this.state.pomiar.waga)+(5.003*this.state.pomiar.wzrost)-(6.755*this.state.wiek)
        }
        else{
            wynik = 655.096+(9.563*this.state.pomiar.waga)+(1.85*this.state.pomiar.wzrost)-(4.676*this.state.wiek)
        }
        return Math.round(wynik)
    }


    /*          Aktywność:
                    LEZY = 1.0
                    CHODZI_PRZY_LOZKU = 1.1
                    PELNA_AKTYWNOSC = 1.2
                StanChorego:
                    NORMA = 1.0
                    SREDNIO_CIEZKI = 1.1
                    CIEZKI = 1.2  */
    wzorLonga(){
        let wynik= this.whb()
        let aktywnosc = 0
        let stanChorego=0
        let temperatura = this.state.pomiar.temperatura
        let temp
        switch(this.state.pomiar.stanChorego){
            case 'NORMA': 
                stanChorego=1;
                break;
            case 'SREDNIO_CIEZKI':
                stanChorego=1.1;
                break;
            case 'CIEZKI': 
                stanChorego=1.2;
                break;
        }
        switch(this.state.pomiar.aktywnosc){
            case 'LEZY': 
                aktywnosc=1;
                break;
            case 'CHODZI_PRZY_LOZKU': 
                aktywnosc=1.1;
                break;
            case 'PELNA_AKTYWNOSC': 
                aktywnosc=1.2;
                break;
        }
        switch(true){
            case (temperatura <= 37.5): 
                temp=1;
                break;
            case (temperatura > 37.5 && temperatura <= 38.5): 
                temp=1.1;
                break;
            case (temperatura > 38.5 && temperatura <= 39.5): 
                temp=1.2;
                break;
            case (temperatura > 39.5): 
                temp=1.3;
                break;
        }
        wynik= wynik * aktywnosc * stanChorego * temp

        return wynik
    }

    componentDidpdate(){
        
    }

    componentWillMount() {
        this._isMounted = false;
      }

     



    render() {
        let suma=0
        return (
            <div style={flexStyle}>
                Wzór Harrisa Benedicta: {this.whb()}
                 Wzór Longa:{this.wzorLonga()}
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

export default TableHelpComponent;