import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import PropertyItem from '../property-card';
import firestore from '@react-native-firebase/firestore'

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

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

    useEffect(() => {
        fetchPropertyList();
    }, [])
    return (
            <FlatList
                data={properties}
                renderItem={({ item }) => <PropertyItem property={item} />}
                keyExtractor={item => item?.id?.toString()}
                contentContainerStyle={{ padding: 10 }}
            />
    );
};

export default PropertyList;
