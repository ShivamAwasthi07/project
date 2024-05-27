import React, { Fragment } from 'react'
import { Text } from 'react-native'
import Header from '../../components/custom-header'
import PropertyList from '../../components/property-list'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../common/Routes'

const AdminProperties = () => {
  const navigation = useNavigation();
  const clickAddProperty = () => {
    navigation.navigate(ROUTES.ADD_PROPERTY_FORM);
  }
  return (
    <Fragment>
      <Header title="Properties" showRightButton={true} rightButtonPress={clickAddProperty} />
      <PropertyList />
    </Fragment>
  )
}

export default AdminProperties