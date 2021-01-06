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
    },
    tableCellBig: {
        margin: "auto",
        height: '15 px',
        fontSize: 10
    },
    singleTable: {
        display: "table",
        borderStyle: "solid",
        marginBottom: "5%",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
});

const RtuPdf = (props) => (
    <View>
        {props.positions.map(row => (
            <View style={styles.singleTable}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{row.preparat.nazwa}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{row.objetosc} ml</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Co ile godz:</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{row.coIleH} h</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Ilość podań/doba</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{Math.round(24 / row.coIleH)} razy na dobę</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Ilość ml/doba</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{Math.round((24 / row.coIleH) * row.objetosc)} ml/dobę</Text>
                    </View>
                </View>
                {row.sposobPodania !== null && (
                    <>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Czas wlewu</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.czasWlewu} h</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Szybkość pretaczania</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{Math.round(row.objetosc / row.czasWlewu)} ml/h</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Sposób podania</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text
                                    style={styles.tableCell}>{row.sposobPodania === 'WLC' ? 'Wlew ciągły' : row.sposobPodania === 'BOL' ? "Bolus" : "Wlew kroplowy"}</Text>
                            </View>
                        </View>
                    </>
                )}


                <View style={styles.tableRow}>
                    <View style={styles.tableBigCol}>
                        <Text style={styles.tableCell}>Uwagi:</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableBigCol}>
                        <Text style={styles.tableCellBig}>{row.uwagi}</Text>
                    </View>
                </View>
            </View>
        ))}
    </View>


)


export default RtuPdf