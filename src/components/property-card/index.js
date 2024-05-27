import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { propertyCardStyles } from './styles';
import COLORS from '../../common/Colors';


const PropertyItem = ({ property }) => (
    <View style={styles.itemContainer}>
        <View style={styles.row}>
            <Icon name="home" size={24} color="#4CAF50" />
            <Text style={styles.title}>{property.name}</Text>
        </View>
        <View style={styles.detailRow}>
            <Icon name="attach-money" size={20} color={COLORS.INFORMATION} />
            <Text style={styles.propTitle}>Rent: <Text style={styles.text}>{"Rs. " + property.rent + "/Month"}</Text></Text>
        </View>

        <View style={styles.detailRow}>
            <Icon name="person" size={20} color={COLORS.INFORMATION} />
            <Text style={styles.propTitle}>Owner: <Text style={styles.text}>{property.owner}</Text></Text>
        </View>

        <View style={styles.detailRow}>
            <Icon name="location-on" size={20} color={COLORS.INFORMATION} />
            <Text style={styles.propTitle}>Address: <Text style={styles.text}>{property.propertyAddress}</Text></Text>
        </View>

        <View style={styles.statusContainer}>
            <Text style={[styles.status, property.status === 'vacant' ? styles.vacant : styles.occupied]}>
                {property.status.toUpperCase()}
            </Text>
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create(propertyCardStyles);
export default PropertyItem;