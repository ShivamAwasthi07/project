import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';


const properties = [
    { sNo: 1, name: 'Green Villa', rent: 1200, owner: 'John Doe', status: 'Rented' },
    { sNo: 2, name: 'Blue Apartments', rent: 900, owner: 'Jane Smith', status: 'Vacant' },
    { sNo: 3, name: 'Sunset Condo', rent: 1500, owner: 'Sarah Connor', status: 'Leased' },
    // Add more properties as needed
];

const PropertyItem = ({ property }) => (
    <View style={styles.itemContainer}>
        <View style={styles.row}>
            <Icon name="home" size={24} color="#4CAF50" />
            <Text style={styles.title}>{property.name}</Text>
        </View>
        <Text style={styles.text}>S.No: {property.sNo}</Text>
        <Text style={styles.text}>Rent: ${property.rent}</Text>
        <Text style={styles.text}>Owner: {property.owner}</Text>
        <Text style={[styles.text, styles.status, property.status === 'Vacant' ? styles.vacant : styles.occupied]}>
            Status: {property.status}
        </Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
    </View>
);

const PropertyList = () => {
    return (
        <FlatList
            data={properties}
            renderItem={({ item }) => <PropertyItem property={item} />}
            keyExtractor={item => item.sNo.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
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
        fontWeight: 'bold',
        marginLeft: 10,
        color: "red"
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: "green"
    },
    status: {
        fontWeight: 'bold',
    },
    vacant: {
        color: 'red',
    },
    occupied: {
        color: 'green',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PropertyList;
