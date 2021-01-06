import React from 'react';
//import ReactPDF from 'react-pdf';
import {PDFDownloadLink, Page, Text, View, Document, StyleSheet,} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    table: {
        display: "table",
        borderStyle: "solid",
        marginRight: "5%",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableBigCol: {
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        fontSize: 10
    }
});

const RtuPdf = (props) => (
    <View style={styles.table}>

        <View style={styles.tableRow}>
            <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Rodzaj Żywienia:</Text>
            </View>
            <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.positions.typZywienia}</Text>
            </View>
        </View>

        <View style={styles.tableRow}>
            <View style={styles.tableBigCol}>
                <Text style={styles.tableCell}>Skład Worka:</Text>
            </View>
        </View>

        <View style={styles.tableRow}>
            <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.positions.worekPreparat.nazwa}</Text>
            </View>
            <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.positions.worekPreparat.objetosc}</Text>
            </View>
        </View>


        <View style={styles.tableRow}>
            <View style={styles.tableBigCol}>
                <Text style={styles.tableCell}>Dodatki:</Text>
            </View>
        </View>


        {props.supply.map(row => (
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{row.dodatek.nazwa}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{row.ilosc}</Text>
                </View>
            </View>
        ))}

    </View>
)


export default RtuPdf