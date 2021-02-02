import React from 'react';
//import ReactPDF from 'react-pdf';
import {Text, View, StyleSheet,} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
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
    tableSignatureCol: {
        width: "50%",
        height: "40px",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        fontSize: 10
    },
});


const FooterPdf = (props) => (
    <View style={styles.table}>
        <View style={styles.tableRow}>
            <View style={styles.tableSignatureCol}>
                <Text style={styles.tableCell}>Podpis zlecającego</Text>
            </View>
            <View style={styles.tableSignatureCol}>
                <Text style={styles.tableCell}>Podpis wykonującego</Text>
            </View>
        </View>

    </View>
)


export default FooterPdf