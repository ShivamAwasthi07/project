import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList } from 'react-native';
import PropertyItem from '../property-card';
import firestore from '@react-native-firebase/firestore'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../common/Routes';

const { height } = Dimensions.get('window');

const PropertyList = () => {
    const navigation = useNavigation();
    const [properties, setProperties] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchPropertyList();
        }, [])
    );

    const confirmDelete = (propertyId) => {
        Alert.alert(
          "Delete Property",
          "Are you sure you want to delete this property?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Delete canceled"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => onDeleteProperty(propertyId)
            }
          ],
          { cancelable: false }
        );
    };

    const onDeleteProperty = async (id) => {
        await firestore().collection('Properties').doc(id).delete().then(() => console.log("deleted successfully."));
        await fetchPropertyList();
    }

    const handleEdit = (property) => {
        navigation.navigate(ROUTES.ADD_PROPERTY_FORM, {edit: true, propertyId : property?.id});
    };
    const fetchPropertyList = async () => {
        try {
            const properties = [];
            const snapshot = await firestore().collection('Properties').get();
            snapshot.forEach(doc => {
                const { propertyName, rent, status, propertyType, propertyAddress } = doc.data();
                properties.push({
                    id: doc.id,
                    propertyName,
                    propertyAddress,
                    rent,
                    status,
                    propertyType,
                });
            });
            setProperties(properties);
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderOpenProperty = (property) => {
        navigation.navigate(ROUTES.PROPERTY_DETAILS, {propertyId : property?.id});
    }

    return (
        <FlatList
            style={{ maxHeight: height * 0.85 }}
            data={properties}
            renderItem={({ item }) => <PropertyItem onOpenDetails={() => renderOpenProperty(item)} onEdit={() => handleEdit(item)} onDelete={() => confirmDelete(item?.id?.toString())} property={item} />}
            keyExtractor={item => item?.id?.toString()}
            contentContainerStyle={{ padding: 10 }}
        />
    );
};

export default PropertyList;
