import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import COLORS from '../../common/Colors';
import ConstData from '../../common/ConstData';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

const AddPropertyForm = () => {
    const [propertyName, setPropertyName] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
    const [rent, setRent] = useState('');
    const [rentFrom, setRentFrom] = useState(new Date());
    const [rentTo, setRentTo] = useState(new Date());
    const [interest, setInterest] = useState('');
    const [status, setStatus] = useState(null);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [propertyType, setPropertyType] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadURLs, setDownloadURLs] = useState([]);

    const handleSubmit = async () => {
        // Handle form submission
        try {
            await uploadImages();
            console.log(downloadURLs)
            await firestore()
                .collection('Properties')
                .add({
                    propertyName,
                    propertyAddress,
                    rent,
                    interest,
                    status,
                    description,
                    propertyType,
                    propertyImages: downloadURLs
                })
                .then(() => {
                    console.log('User added!');
                    setDownloadURLs([]);
                });
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
                downloadURLs
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleImagePick = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 4 });
            if (!result.didCancel && !result.error && result.assets) {
                setImages(result.assets);
            }
        } catch (error) {
            console.error('Error picking image: ', error);
        }
    };

    const uploadImage = async (imageUri, imageName) => {
        const reference = storage().ref(`/property-images/${imageName}`);
        const task = reference.putFile(imageUri);

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        await task;

        const url = await reference.getDownloadURL();
        return url;
    };

    const uploadImages = async () => {
        setUploading(true);
        const uploadPromises = images.map(image => {
            const imageName = image.fileName || image.uri.split('/').pop();
            return uploadImage(image.uri, imageName);
        });

        try {
            const urls = await Promise.all(uploadPromises);
            setDownloadURLs(urls);
            console.log('All images uploaded and URLs retrieved: ', urls);
        } catch (error) {
            console.error('Error uploading images: ', error);
        } finally {
            setUploading(false);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Property Name</Text>
            <TextInput
                style={styles.input}
                value={propertyName}
                onChangeText={setPropertyName}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                value={propertyAddress}
                onChangeText={setPropertyAddress}
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
                data={ConstData.STATUS_OPTIONS}
                labelField="label"
                valueField="value"
                placeholder="Select status"
                value={status}
                onChange={item => setStatus(item.value)}
                placeholderStyle={ConstData.DROPDOWN_STYLES.placeHolderStyles}
                itemTextStyle={ConstData.DROPDOWN_STYLES.itemTextStyles}
                itemContainerStyle={ConstData.DROPDOWN_STYLES.itemContainerStyles}
                containerStyle={ConstData.DROPDOWN_STYLES.containerStyles}
                selectedTextStyle={ConstData.DROPDOWN_STYLES.selectedTextStyles}
            />

            <Text style={styles.label}>Property Description</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                placeholder="Type here..."
                placeholderTextColor={COLORS.BLACK_LIGHT}
            />


            <Text style={styles.label}>Property Images</Text>
            <TouchableOpacity style={styles.button} onPress={handleImagePick}>
                <Text style={styles.buttonText}>Pick Images</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                ))}
            </View>

            <Text style={styles.label}>Property Type</Text>
            <Dropdown
                style={styles.dropdown}
                data={ConstData.PROPERTY_TYPE_OPTIONS}
                labelField="label"
                valueField="value"
                placeholder="Select property type"
                value={propertyType}
                onChange={item => setPropertyType(item.value)}
                placeholderStyle={ConstData.DROPDOWN_STYLES.placeHolderStyles}
                itemTextStyle={ConstData.DROPDOWN_STYLES.itemTextStyles}
                itemContainerStyle={ConstData.DROPDOWN_STYLES.itemContainerStyles}
                containerStyle={ConstData.DROPDOWN_STYLES.containerStyles}
                selectedTextStyle={ConstData.DROPDOWN_STYLES.selectedTextStyles}

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
        color: COLORS.ORANGE_DARK
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
