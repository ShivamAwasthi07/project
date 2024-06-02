import React, { Fragment, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../common/Colors';
import Header from '../../components/custom-header';

const AddCustomerScreen = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [adhaarcard, setAdhaarcard] = useState(null);
  const [pancard, setPancard] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleDocumentPicker = async (setFile) => {
    try {
      const res = await DocumentPicker?.pick({
        type: [DocumentPicker?.types?.allFiles],
      });
      setFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  };

  const handleSubmit = () => {
    const formData = {
      customerName,
      customerAddress,
      companyName,
      adhaarcard,
      pancard,
      profilePhoto,
    };
    console.log('Form Data: ', formData);
    // Add your form submission logic here
  };

  return (
        <Fragment>
            <Header title="Add Customer" />
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
      />

      <Text style={styles.label}>Customer Address</Text>
      <TextInput
        style={styles.input}
        value={customerAddress}
        onChangeText={setCustomerAddress}
      />

      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
      />

      <Text style={styles.label}>Adhaarcard PDF</Text>
      <TouchableOpacity 
        style={[styles.button, adhaarcard ? styles.buttonUploaded : null]} 
        onPress={() => handleDocumentPicker(setAdhaarcard)}
      >
        <Text style={[styles.buttonText, adhaarcard ? styles.buttonTextUploaded : null]}>
          {adhaarcard ? `${adhaarcard?.name}` : 'Pick Adhaarcard PDF'}
        </Text>
        {adhaarcard && <Icon name="check-circle" size={20} color={COLORS.SUCCESS} />}
      </TouchableOpacity>
      
      <Text style={styles.label}>Pancard PDF</Text>
      <TouchableOpacity 
        style={[styles.button, pancard ? styles.buttonUploaded : null]} 
        onPress={() => handleDocumentPicker(setPancard)}
      >
        <Text style={[styles.buttonText, pancard ? styles.buttonTextUploaded : null]}>
          {pancard ? `${pancard?.name}` : 'Pick Pancard PDF'}
        </Text>
        {pancard && <Icon name="check-circle" size={20} color={COLORS.SUCCESS} />}
      </TouchableOpacity>
      {/* {pancard && <Text style={styles.fileName}></Text>} */}

      <Text style={styles.label}>Profile Photo</Text>
      <TouchableOpacity 
        style={[styles.button, profilePhoto ? styles.buttonUploaded : null]} 
        onPress={() => handleDocumentPicker(setProfilePhoto)}
      >
        <Text style={[styles.buttonText, profilePhoto ? styles.buttonTextUploaded : null]}>
          {profilePhoto ? 'Profile Photo Uploaded' : 'Pick Profile Photo'}
        </Text>
        {profilePhoto && <Icon name="check-circle" size={20} color="green" />}
      </TouchableOpacity>
      {profilePhoto && <Image source={{ uri: profilePhoto.uri }} style={styles.image} />}

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
        </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.GREY_4
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 16,
},
buttonText: {
    color: 'white',
},
buttonTextUploaded: {
    color: COLORS.SUCCESS,
},
buttonUploaded: {
    backgroundColor: COLORS.SUCCESS_BG,
  },
  fileName: {
    marginTop: 8,
    marginBottom: 16,
    color: 'gray',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: 200,
    marginTop: 16,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 16,
    marginBottom: 16,
  },
});

export default AddCustomerScreen;
