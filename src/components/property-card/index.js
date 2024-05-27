import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, SafeAreaViewBase, SafeAreaViewComponent } from 'react-native';
import COLORS from '../../common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PropertyItem = ({ property }) => (
    <View style={styles.itemContainer}>
        <View style={styles.row}>
            <Icon name="home" size={24} color="#4CAF50" />
            <Text style={styles.title}>{property.name}</Text>
        </View>
        <Text style={styles.propTitle}>Rent:<Text style={styles.text}>{" Rs. " + property.rent + "/Month"}</Text></Text>
        <Text style={styles.propTitle}>Owner:<Text style={styles.text}>{" " + property.owner}</Text></Text>
        <Text style={styles.propTitle}>Address:<Text style={styles.text}>{" " + property.owner}</Text></Text>
        <Text style={styles.propTitle}>Status:<Text style={[styles.text, styles.status, property.status === 'Vacant' ? styles.vacant : styles.occupied]}>
            {" " + property.status}
        </Text></Text>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Rent It</Text>
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    propTitle: {
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    itemContainer: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        marginLeft: 10,
        color: COLORS.INFORMATION
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        // color: "green",
        fontWeight: '300'
    },
    status: {
        fontWeight: '300',
    },
    vacant: {
        color: COLORS.SUCCESS,
    },
    occupied: {
        color: COLORS.ERROR,
    },
    button: {
        marginTop: 10,
        backgroundColor: COLORS.INFORMATION_BG,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.INFORMATION,
        fontSize: 16,
    },
});

export default PropertyItem;