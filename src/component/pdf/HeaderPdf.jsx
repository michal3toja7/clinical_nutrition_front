import React from 'react';
//import ReactPDF from 'react-pdf';
import  { PDFDownloadLink,Page, Text, View, Document, StyleSheet,  } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    table: { 
      display: "table", 
      width: "90%", 
      marginLeft:"5%",
      marginRight:"5%",
      marginTop:"5%",
      marginBottom:"5%",
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    }, 
    tableBigCol: { 
        width: "75%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
    tableCell: { 
      margin: "auto", 
      fontSize: 10 
    },
    header:{
        margin: "auto", 
        marginTop: 10, 
        fontSize: 25,
        marginBottom: -10,  
    }
  });




const HeaderPdf = (props) =>(
    <View>
    <View style={styles.header}>
        <Text style={styles.header}>{props.order.typ === 'DOJ'? "Żywiewnie Dojelitowe": (props.order.typ === 'DOU'? "Żywiewnie Doustne": "Zlecenie na worek RTU")}</Text>
    </View>

    <View style={styles.table}> 
        <View style={styles.tableRow}> 
            <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Data realizacji:</Text> 
            </View> 
            <View style={styles.tableCol}> 
                <Text style={styles.tableCell}> {(new Date(props.order.dataNa)).toLocaleDateString()} </Text> 
            </View> 
            <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Data Zamówienia:</Text> 
            </View> 
            <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{(new Date(props.order.dataZlecenia)).toLocaleDateString()}</Text> 
            </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Imię i nazwisko:</Text> 
                </View> 
                <View style={styles.tableBigCol}> 
                    <Text style={styles.tableCell}>{props.order.pacjent.imiona} {props.order.pacjent.nazwisko}</Text> 
                </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Jednostka zlecająca:</Text> 
                </View> 
                <View style={styles.tableBigCol}> 
                    <Text style={styles.tableCell}>{props.order.josZamawiajacy.nazwa} </Text> 
                </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Jednostka wykonująca:</Text> 
                </View> 
                <View style={styles.tableBigCol}> 
                    <Text style={styles.tableCell}>{props.order.josRealizujacy.nazwa}</Text> 
                </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Rozpoznanie:</Text> 
                </View> 
                <View style={styles.tableBigCol}> 
                    <Text style={styles.tableCell}>{props.order.rozpoznanie}  </Text> 
                </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Data urodzenia:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{(new Date(props.order.pacjent.dataUrodzenia)).toLocaleDateString()}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Płeć:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{props.order.pacjent.plec === 'M'? "Mężczyzna" : "Kobieta"}</Text> 
                </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Waga:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{props.order.pomiar.waga}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>BMI:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{Math.round(100*(props.order.pomiar.waga / (props.order.pomiar.wzrost*props.order.pomiar.wzrost)))/100}</Text> 
                </View> 
            </View>

            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Wzrost:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{props.order.pomiar.wzrost}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Temperatura:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{props.order.pomiar.temperatura}</Text> 
                </View> 
            </View>


    </View>
    </View>
)


export default  HeaderPdf