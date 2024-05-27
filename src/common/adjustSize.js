import { Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get('window');

const staticHeight = Platform.isPad ? 1366 : 844
const staticWidth = Platform.isPad ? 1024 : 390

export default adjustSize = (value, type) => {
    let ratio = 0;
    ratio = value / (type === "h" ? staticHeight : staticWidth);
    return ratio * (type === "h" ? height : width);
}