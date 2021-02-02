import React from 'react';
import {Text, View, StyleSheet,} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    table: {
        marginLeft: "5%",
    },

    singleTable: {
        display: "table",
        borderStyle: "solid",
        marginBottom: "5%",
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
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        fontSize: 10
    },
    tableHeader: {
        margin: "auto",
        fontWeight: 'bold',
        fontSize: 10
    }
});


const TableIngredientsPdf = (props) => (
    <View style={styles.table}>
        <View style={styles.singleTable}>
            {props.tableIngredients.elektrolity.map((row, index) => (
                <View style={styles.tableRow}>
                    {Object.keys(row).map(col => (
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                {isNaN(row[col]) || row[col] === '' ? row[col] : Math.round(100 * row[col]) / 100}
                            </Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
        <View style={styles.singleTable}>
            {props.tableIngredients.zawartosc.map((row, index) => (
                <View style={styles.tableRow}>
                    {Object.keys(row).map(col => (
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                {isNaN(row[col]) || row[col] === '' ? row[col] : Math.round(100 * row[col]) / 100}
                            </Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
        <View style={styles.singleTable}>
            {props.tableIngredients.podazDoba.map((row, index) => (
                <View style={styles.tableRow}>
                    {Object.keys(row).map(col => (
                        <View style={styles.tableBigCol}>
                            <Text style={styles.tableCell}>
                                {isNaN(row[col]) || row[col] === '' ? row[col] : Math.round(100 * row[col]) / 100}
                            </Text>
                        </View>
                    ))}
                </View>
            ))}

        </View>
    </View>
)


export default TableIngredientsPdf