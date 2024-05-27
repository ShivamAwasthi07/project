import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import COLORS from '../../common/Colors';
import IMAGES from '../../common/Images';
import adjustSize from '../../common/adjustSize';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.06,
    width: Platform.isPad ? adjustSize(960, 'w') : width,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.DARK_2,
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
  rightContainer: {
    width: Platform.isPad ? 110 : width * 0.25,
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: Platform.isPad ? adjustSize(28, 'w') : width * 0.06,
  },
  rightContainerTab: {
    width: Platform.isPad ? adjustSize(106, 'w') : width * 0.25,
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightContainerTabNew: {
    width: Platform.isPad ? adjustSize(106, 'w') : width * 0.25,
    height: height * 0.04,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    height: height * 0.04,
    width: width * 0.15,
    justifyContent: 'center',
  },
  rightImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.01,
    marginHorizontal: width * 0.01,
  },
  rightImageWrapperTab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: adjustSize(40, 'w'),
    height: adjustSize(40, 'w'),
    // backgroundColor:'blue'
  },
  rightImage: {
    width: Platform.isPad ? adjustSize(36, 'w') : adjustSize(24, 'w'),
    height: Platform.isPad ? adjustSize(36, 'w') : adjustSize(24, 'w'),
  },
  titleText: {
    fontSize: Platform.isPad ? adjustSize(28, 'h') : adjustSize(24, 'h'),
    textAlign: 'center',
    fontWeight: Platform.isPad ? '500' : '400',
    letterSpacing: 1,
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
  const {
    title,
    backButton = false,
    onBackButtonPress,
    showRightButton = false,
    rightButtonPress,
  } = props;

  return (
    <View style={styles.container}>
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
      <View
        style={
          Platform.isPad
            ? styles.rightContainerTabNew
            : Platform.isPad
              ? styles.rightContainerTab
              : styles.rightContainer
        }>
        {showRightButton && (<TouchableOpacity
          onPress={rightButtonPress}
          style={styles.buttonRight}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>)}

      </View>
    </View>
  );
};

export default Header;
