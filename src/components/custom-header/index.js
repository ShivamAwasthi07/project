import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
// import {COLORS, IMAGES} from '../../shared';
// import adjustSize from '../../shared/adjustSize';
import COLORS from '../../common/Colors';
import IMAGES from '../../common/Images';
import adjustSize from '../../common/adjustSize';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.06,
    width: Platform.isPad ? adjustSize(960, 'w') : width,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.DARK_3,
    // alignSelf: 'center',
  },
  leftContainer: {
    width: Platform.isPad ? adjustSize(80, 'w') : width * 0.25,
    height: height * 0.06,
    justifyContent: 'center',
    paddingLeft: Platform.isPad ? 0 : 29,
  },
  mainContainer: {
    width: Platform.isPad ? width * 0.7 : width * 0.5,
    height: height * 0.06,
    justifyContent: 'center',
  },
  mainContainerTab: {
    flex: 1,
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: height * 0.04,
    width: width * 0.15,
    justifyContent: 'center',
},
  titleText: {
    fontSize: Platform.isPad ? adjustSize(28, 'h') : adjustSize(24, 'h'),
    textAlign: 'center',
    fontWeight: Platform.isPad ? '500' : '600',
  },
  buttonText: {
    fontSize: adjustSize(13, 'h'),
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  buttonImage: {
    height: Platform.isPad ? 32 : 20,
    width: Platform.isPad ? 32 : 20,
  },
});

const Header = props => {
  const navigation = useNavigation();
  const {
    title,
    backButton,
    onBackButtonPress,
    rightButtonType='Skip', // 'Skip' or 'Cancel' or 'ClassOptions'
    rightButtonPress,
    rightButton = true,
    rightImages = [IMAGES.CANCEL],
    resizeMode = 'cover',
    rightImageStyle,
  } = props;
  return (
    <View style={[styles.container, {marginTop: adjustSize(0, 'h')}]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.leftContainer}
        >
        {backButton ? (
          <TouchableOpacity onPress={onBackButtonPress} style={styles.button}>
            <Image
              resizeMode={'contain'}
              source={IMAGES.LEFT_ARROW}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.button} />
        )}
      </TouchableOpacity>
      <View
        style={Platform.isPad ? styles.mainContainerTab : styles.mainContainer}>
        {title ? (
          <Text style={styles.titleText}>
            {title}
          </Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default Header;
