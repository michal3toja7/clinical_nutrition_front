import React from 'react';
import {PDFDownloadLink, Page, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import HeaderPdf from '../pdf/HeaderPdf'
import RtuPdf from './RtuPdf'
import TableIngredientsPdf from './TableIngredientsPdf'
import FooterPdf from './FooterPdf'

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});


const styles = StyleSheet.create({
    page: {
        //margin: '50px',
        // flexDirection: 'row',
        fontFamily: "Roboto",
        backgroundColor: '#FFFFFF'
    },
    section: {
        flexGrow: 1
    },

    body: {
        marginLeft: "5%",
        marginRight: "5%",

        flexDirection: "row"
    },
    bodyCol: {
        width: "50%",
    },


});

// Create Document Component
const MyDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <HeaderPdf order={props.props.order}/>
            <View style={styles.body}>
                <View style={styles.bodyCol}>
                    <RtuPdf positions={props.props.positions[0]} supply={props.props.supply}/>
                </View>
                <View style={styles.bodyCol}>
                    <TableIngredientsPdf tableIngredients={props.props.tableIngredients}/>
                </View>
            </View>
            <FooterPdf positions={props.props.positions[0]} podaz={props.props.tableIngredients.podazDoba}/>
        </Page>
    </Document>
);

export default function OrderPdf(props) {
    return (
        <PDFDownloadLink style={{textDecoration: 'none', color: 'white'}} document={<MyDocument props={props}/>}
                         fileName="somename.pdf">
            {({blob, url, loading, error}) => (loading ? "Drukowanie..." : window.open(url, '_blank'), "Drukuj")}
        </PDFDownloadLink>)
}