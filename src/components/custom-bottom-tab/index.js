import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import { ROUTES } from '../../common/Routes';
import COLORS from '../../common/Colors';
import adjustSize from '../../common/adjustSize';
import IMAGES from '../../common/Images';
const { height, width } = Dimensions.get('window');
//updated
const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.095,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    bottom: 0,
    position: 'absolute',
    backgroundColor: COLORS.DARK_2,

    // backgroundColor: 'yellow'
  },
  containerGym: {
    width,
    height: height * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    bottom: 0,
    position: 'absolute',
    borderWidth: 1,
    borderTopColor: COLORS.DARK_1,
    backgroundColor: COLORS.DARK_2,

  },
  profilePic: {
    height: height * 0.036,
    width: height * 0.036,
    borderRadius: height * 0.06,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonWrapper: {
    width: height * 0.05,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01
  },
  containerTab: {
    width,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    bottom: 0,
    position: 'absolute',
    height: adjustSize(110, 'v'),
    alignItems: 'flex-start',
    backgroundColor: COLORS.DARK_2,
    paddingTop: 2
  },
  containerInside: {
    width,
    height: height * 0.089,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: COLORS.DARK_2,
    flexDirection: 'row',
    borderRadius: Platform.isPad ? 8 : 10
  },
  containerInsideTab: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    borderRadius: Platform.isPad ? 8 : 10,
    width: adjustSize(492, 'w'),
    backgroundColor: COLORS.DARK_2,
    borderColor: COLORS.DARK_1,
    borderWidth: 1.5,
    height: adjustSize(80, 'h'),
    justifyContent: 'space-around'
  },
  tabButton: {
    width: adjustSize(84, 'w'),
    height: adjustSize(55, 'h'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabButtonMobile: {
    width: adjustSize(64, 'w'),
    height: adjustSize(45, 'h'),
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  tabImage: {
    width: Platform.isPad ? adjustSize(32, 'w') : adjustSize(24, 'w'),
    height: Platform.isPad ? adjustSize(32, 'w') : adjustSize(24, 'w')
  },
  tabText: {
    fontSize: Platform.isPad ? adjustSize(14, 'h') : adjustSize(12, 'h'),
    fontWeight: '600',
    height: Platform.isPad ? adjustSize(14, 'h') : adjustSize(13, 'h')
  }
});

const CustomBottomTabBar = (props) => {
  const { navigation, state } = props;
  const { index } = state;
  let profilePic = ""

  return (
    <View style={styles.container} >
      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ADMIN_HOME)} style={styles.buttonWrapper} >
          <Image source={index == 0 ? IMAGES.HOME_SELECTED : IMAGES.HOME_INACTIVE} />
          {index === 0 && (<Text style={{ fontSize: 9, color: "white" }}>home</Text>)}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ADMIN_CUSTOMERS)} style={styles.buttonWrapper} >
          <Image source={index == 1 ? IMAGES.ACTIVITIES_ACTIVE : IMAGES.ACTIVITIES_INACTIVE} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ADMIN_PROPERTIES)} style={styles.buttonWrapper} >
          <Image source={index == 2 ? IMAGES.FAV_ACTIVE : IMAGES.FAV_INACTIVE} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ACCOUNT_INFO)} style={styles.buttonWrapper} >
          <Image source={profilePic ? { uri: profilePic } : IMAGES.PROFILE} style={styles.profilePic} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default CustomBottomTabBar;