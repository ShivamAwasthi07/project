import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import COLORS from '../../common/Colors';
import ConstData from '../../common/ConstData';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AddPropertyForm = ({route}) => {
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [rent, setRent] = useState('');
  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [propertyType, setPropertyType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchproperty = async id => {
    const doc = await firestore().collection('Properties').doc(id).get();
    if (doc.exists) {
      const {
        description,
        propertyName,
        propertyAddress,
        status,
        images,
        interest,
        rent,
        propertyType,
      } = doc.data();
      setPropertyName(propertyName);
      setPropertyAddress(propertyAddress);
      setStatus(status);
      // setImages(images);
      setInterest(interest);
      setRent(rent);
      setDescription(description);
      setPropertyType(propertyType);
    } else {
      Alert.alert('Could not fetch!!');
    }
  };
  useEffect(() => {
    if (!!route?.params?.edit) {
      fetchproperty(route?.params?.propertyId);
    }
  }, [route]);

  const handleSubmit = async () => {
    let err = {};
    if (!propertyName) err.propertyName = 'Please Add Property Name';
    if (!propertyAddress) err.propertyAddress = 'Please Add Property Address';
    if (!description) err.description = 'Please Add Property Description';
    if (!propertyType) err.propertyType = 'Please Add Property Type';
    if (!rent) err.rent = 'Please Add rent value';
    if (!interest) err.interest = 'Please Add interest %age';
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    try {
      setUploading(true);
      const uploadPromises = images.map(image => {
        const imageName = image.fileName || image.uri.split('/').pop();
        return uploadImage(image.uri, imageName);
      });
      let urls = [];
      try {
        urls = await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Error uploading images: ', error);
        return;
      }
      let postObject = {
        propertyName,
        propertyAddress,
        rent,
        interest,
        status,
        description,
        propertyType,
        // propertyImages: urls
      };
      if (route?.params?.edit) {
        await firestore()
          .collection('Properties')
          .doc(route?.params?.propertyId)
          .update(postObject)
          .then(() => console.log('updated successfully'));
      } else {
        postObject.images = urls;
        await firestore()
          .collection('Properties')
          .add(postObject)
          .then(() => {
            console.log('Property added!');
          });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 4,
      });
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
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    await task;

    const url = await reference.getDownloadURL();
    return url;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Property Name</Text>
      <TextInput
        style={styles.input}
        value={propertyName}
        onChangeText={setPropertyName}
      />
      {errors?.propertyName && (
        <Text style={{color: COLORS.RED}}>{errors?.propertyName}</Text>
      )}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={propertyAddress}
        onChangeText={setPropertyAddress}
      />
      {errors?.propertyAddress && (
        <Text style={{color: COLORS.RED}}>{errors?.propertyAddress}</Text>
      )}

      <Text style={styles.label}>Rent (per month)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={rent}
        onChangeText={setRent}
      />
      {errors?.rent && <Text style={{color: COLORS.RED}}>{errors?.rent}</Text>}
      <Text style={styles.label}>Interest %</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={interest}
        onChangeText={setInterest}
      />
      {errors?.interest && (
        <Text style={{color: COLORS.RED}}>{errors?.interest}</Text>
      )}
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
      {errors?.description && (
        <Text style={{color: COLORS.RED}}>{errors?.description}</Text>
      )}

      <Text style={styles.label}>Property Images</Text>
      <TouchableOpacity
        style={[styles.button, styles.disabledButton]}
        disabled={route?.params?.edit}
        onPress={handleImagePick}>
        <Text style={[styles.buttonText, styles.disabledButtonText]}>Pick Images</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{uri: image.uri}} style={styles.image} />
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
      {errors?.propertyType && (
        <Text style={{color: COLORS.RED}}>{errors?.propertyType}</Text>
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={uploading}>
        <Text style={styles.submitButtonText}>
          {uploading ? (
            <ActivityIndicator size="small" color={COLORS.SUCCESS} />
          ) : (
            'Submit'
          )}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e2e2e2',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
    color: COLORS.BLACK_LIGHT,
  },
  input: {
    borderWidth: 1,
    borderColor: 'silver',
    padding: 10,
    borderRadius: 5,
    color: COLORS.ORANGE_DARK,
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
  disabledButton: {
    backgroundColor: COLORS.GREY_2,
    color: 'black'
  },    
  disabledButtonText: {
    color: COLORS.SUBTITLE_TEXT
  },    
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: COLORS.SUCCESS_BG,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 40,
    // paddingBottom: 40
  },
  submitButtonText: {
    color: COLORS.SUCCESS,
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
