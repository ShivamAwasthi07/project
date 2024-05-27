import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import COLORS from '../../common/Colors';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';


const AddPropertyForm = () => {
    const [propertyName, setPropertyName] = useState('');
    const [rent, setRent] = useState('');
    const [rentFrom, setRentFrom] = useState(new Date());
    const [rentTo, setRentTo] = useState(new Date());
    const [interest, setInterest] = useState('');
    const [status, setStatus] = useState(null);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [propertyType, setPropertyType] = useState(null);

    const statusOptions = [
        { label: 'Rented', value: 'rented' },
        { label: 'Leased', value: 'leased' },
        { label: 'Vacant', value: 'vacant' },
    ];

    const propertyTypeOptions = [
        { label: 'Flat', value: 'flat' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Office', value: 'office' },
        { label: 'House', value: 'house' },
        { label: 'Other', value: 'other' },
    ];

    const handleSubmit = () => {
        // Handle form submission
        console.log({
            propertyName,
            rent,
            rentFrom,
            rentTo,
            interest,
            status,
            description,
            images,
            propertyType,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Property Name</Text>
            <TextInput
                style={styles.input}
                value={propertyName}
                onChangeText={setPropertyName}
            />

            <Text style={styles.label}>Rent (per month)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rent}
                onChangeText={setRent}
            />

            <Text style={styles.label}>Interest %</Text>
            <TextInput

                style={styles.input}
                keyboardType="numeric"
                value={interest}
                onChangeText={setInterest}
            />

            <Text style={styles.label}>Status</Text>
            <Dropdown
                style={styles.dropdown}
                data={statusOptions}
                labelField="label"
                valueField="value"
                placeholder="Select status"
                placeholderStyle={{ color: COLORS.DARK_3 }}
                itemTextStyle={{ color: 'blue' }}
                itemContainerStyle={{ backgroundColor: 'cyan', borderRadius: 5, marginBottom: 2 }}
                value={status}
                onChange={item => setStatus(item.value)}
            />

            <Text style={styles.label}>Property Description</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                placeholder="Type here..."
            />


            <Text style={styles.label}>Property Images</Text>
            {/* <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Pick Images</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View> */}

            <Text style={styles.label}>Property Type</Text>
            <Dropdown
                style={styles.dropdown}
                data={propertyTypeOptions}
                labelField="label"
                valueField="value"
                placeholder="Select property type"
                value={propertyType}
                onChange={item => setPropertyType(item.value)}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#e2e2e2'
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 10,
        color: COLORS.BLACK_LIGHT
    },
    input: {
        borderWidth: 1,
        borderColor: 'silver',
        padding: 10,
        borderRadius: 5,
    },
    datePicker: {
        width: '100%',
        marginVertical: 10,
    },
    dropdown: {
        borderWidth: 1,
        padding: 10,
        borderColor: 'silver',
        borderRadius: 5,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
});

export default AddPropertyForm;
