import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import Header from '../../components/custom-header';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../common/Routes';

const sampleData = [
  {
    id: '1',
    name: 'John Doe',
    aadhaarNumber: '1234-5678-9012',
    panNumber: 'ABCDE1234F',
    address: '123 Main St, Springfield',
    companyName: 'Acme Corp',
    docs: {
      aadhaar: 'https://example.com/aadhaar.pdf',
      picture: 'https://example.com/picture.jpg',
      pan: 'https://example.com/pan.pdf',
    },
  },
  // Add more sample data as needed
];

const Card = ({item, onDocPress}) => (
  <View style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.details}>Aadhaar Number: {item.aadhaarNumber}</Text>
    <Text style={styles.details}>PAN No.: {item.panNumber}</Text>
    <Text style={styles.details}>Address: {item.address}</Text>
    <Text style={styles.details}>Company Name: {item.companyName}</Text>
    <View style={styles.docsContainer}>
      <TouchableOpacity onPress={() => onDocPress(item.docs.aadhaar)}>
        <Text style={styles.docButton}>Aadhaar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDocPress(item.docs.picture)}>
        <Text style={styles.docButton}>Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDocPress(item.docs.pan)}>
        <Text style={styles.docButton}>PAN</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AdminCustomers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [docUrl, setDocUrl] = useState('');
  const navigation = useNavigation();

  const handleDocPress = url => {
    setDocUrl(url);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Customers"
        showRightButton={true}
        rightButtonPress={() => navigation.navigate(ROUTES.ADD_CUSTOMER_FORM)}
      />
      <FlatList
        data={sampleData}
        renderItem={({item}) => (
          <Card item={item} onDocPress={handleDocPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  docsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  docButton: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default AdminCustomers;
