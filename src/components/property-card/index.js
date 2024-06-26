import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { propertyCardStyles } from './styles';
import COLORS from '../../common/Colors';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const iconType = {
    house : 'home',
    warehouse: 'warehouse',
    office: 'office-building',
}
const PropertyItem = ({ property, onDelete, onEdit, onOpenDetails }) => (
    <View style={styles.itemContainer}>
        <View style={styles.row}>
            <MCIIcons name={iconType[`${property?.propertyType || "house"}`]} color={COLORS.INFORMATION} size={20}/>
            <Text style={styles.title} onPress={onOpenDetails}>{property.propertyName}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => onEdit(property)}>
                    <MCIIcons name="pencil" size={20} color={COLORS.INFORMATION} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(property)}>
                    <MCIIcons name="delete" size={20} color={COLORS.ERROR} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.detailRow}>
            <Text style={styles.propTitle}>Rent: <Text style={styles.text}>{"Rs. " + property.rent + "/Month"}</Text></Text>
        </View>

        <View style={styles.detailRow}>
            <Text style={styles.propTitle}>Address: <Text style={styles.text}>{property.propertyAddress}</Text></Text>
        </View>

        <View style={styles.statusContainer}>
            <Text style={[styles.status, property.status === 'vacant' ? styles.vacant : styles.occupied]}>
                {property?.status?.toUpperCase()}
            </Text>
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create(propertyCardStyles);
export default PropertyItem;