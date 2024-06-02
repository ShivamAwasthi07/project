import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ConstData from '../../common/ConstData';
import Header from '../../components/custom-header';

const {width: viewportWidth} = Dimensions.get('window');

const PropertyDetail = ({route}) => {
  const [property, setProperty] = useState({});
  const fetchproperty = async id => {
    const doc = await firestore().collection('Properties').doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      setProperty(data);
    } else {
      Alert.alert('Could not fetch!!');
    }
  };

  useEffect(() => {
    fetchproperty(route?.params?.propertyId);
  }, []);

  const renderImage = ({item}) => (
    <Image source={{uri: item}} style={styles.image} />
  );

  return (
      <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.name}>{property?.propertyName}</Text>
          <Text style={styles.address}>{property?.propertyAddress}</Text>
          <Text style={styles.rent}>Rent: {property?.rent}</Text>
          <Text style={styles.status}>Status: {property?.status}</Text>
          <Text style={styles.type}>
            Type: {ConstData.PROPERTY_TYPE[`${property?.propertyType}`]}
          </Text>
          <Text style={styles.description}>{property?.description}</Text>
          <Text style={styles.interestRate}>
            Interest Rate: {property?.interestRate}%
          </Text>
        </View>
        <FlatList
          data={property?.images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    scrollContainer: {
      padding: 16,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    address: {
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
    },
    rent: {
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
    },
    status: {
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
    },
    type: {
      fontSize: 16,
      marginBottom: 16,
      color: '#666',
    },
    description: {
      fontSize: 16,
      marginBottom: 16,
      color: '#333',
    },
    interestRate: {
      fontSize: 16,
      marginBottom: 16,
      color: '#333',
    },
    carousel: {
      marginTop: 16,
    },
    image: {
      width: viewportWidth * 0.8,
      height: 200,
      marginRight: 10,
      borderRadius: 8,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      color: '#ff0000',
    },
  });
  

export default PropertyDetail;
