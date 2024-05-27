import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, SafeAreaViewBase, SafeAreaViewComponent } from 'react-native';
import COLORS from '../../common/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropertyItem from '../property-card';


const properties = [
    { sNo: 1, name: 'Green Villa', rent: 1200, owner: 'John Doe', status: 'Rented' },
    { sNo: 2, name: 'Blue Apartments', rent: 900, owner: 'Jane Smith', status: 'Vacant' },
    { sNo: 3, name: 'Sunset Condo', rent: 1500, owner: 'Sarah Connor', status: 'Leased' },
    { sNo: 4, name: 'Sunset Condo', rent: 1500, owner: 'Sarah Connor', status: 'Leased' },
    { sNo: 5, name: 'Sunset Condo', rent: 1500, owner: 'Sarah Connor', status: 'Leased' },
    { sNo: 6, name: 'Sunset Condo', rent: 1500, owner: 'Sarah Connor', status: 'Leased' },
    // Add more properties as needed
];

const PropertyList = () => {
    return (
        <SafeAreaView>
            <FlatList
            data={properties}
            renderItem={({ item }) => <PropertyItem property={item} />}
            keyExtractor={item => item.sNo.toString()}
            contentContainerStyle={{padding: 10}}
        />
        </SafeAreaView>
    );
};

export default PropertyList;
