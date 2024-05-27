import React, { Fragment } from 'react'
import { Text } from 'react-native'
import Header from '../../components/custom-header'
import PropertyList from '../../components/property-list'

const AdminProperties = () => {
  return (
    <Fragment>
      <Header title="Properties" />
      <PropertyList />
    </Fragment>
  )
}

export default AdminProperties