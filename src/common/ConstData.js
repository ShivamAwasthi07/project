import COLORS from "./Colors"

const SCREEN_OPTIONS = {
    headerShown: false,
    gestureEnabled: false,
    animation: 'slide_from_right'
}

const DROPDOWN_STYLES = {
    placeHolderStyles: {color: COLORS.BLACK_LIGHT, fontSize: 14},
    itemContainerStyles: { borderRadius: 5, marginBottom: 2 },
    itemTextStyles: {color : COLORS.BLACK_LIGHT},
    containerStyles: {borderRadius: 5},
    selectedTextStyles: {color : COLORS.BLACK_LIGHT, fontWeight: '600'}
}

const STATUS_OPTIONS = [
    { label: 'Rented', value: 'rented' },
    { label: 'Leased', value: 'leased' },
    { label: 'Vacant', value: 'vacant' },
];

const PROPERTY_TYPE_OPTIONS = [
    { label: 'Flat', value: 'flat' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Office', value: 'office' },
    { label: 'House', value: 'house' },
    { label: 'Other', value: 'other' },
];

const PROPERTY_TYPE = {
    flat: 'Flat',
    warehouse: 'Ware House',
    office: 'Office',
    house: 'House',
    other: 'Other'
}

export default DATA = {
    SCREEN_OPTIONS,
    DROPDOWN_STYLES,
    STATUS_OPTIONS,
    PROPERTY_TYPE_OPTIONS,
    PROPERTY_TYPE
}