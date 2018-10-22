import { StyleSheet } from 'react-native';

import Colors from './Colors';

// This file is for a reusable grouping of Theme items

export const sizes = {
  SMALL: 5,
  MEDIUM: 15,
  LARGE: 30,
};

export default StyleSheet.create({
  abs100: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 40,
    padding: 20,
  },
  btn_orange: {
    alignSelf: 'center',
    marginBottom: '2%',
    backgroundColor: Colors.orange,
},
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexNone: {
    flex: 0,
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
  },
  flexThree: {
    flex: 3,
  },
  flexFour: {
    flex: 4,
  },

  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // TODO - fix these files and how they're imported so you can import this from the theme variables
  textDanger: {
    color: '#a94442',
  },

  marginNone: {
    margin: 0,
  },
  marginSmall: {
    margin: sizes.SMALL,
  },
  marginMedium: {
    margin: sizes.MEDIUM,
  },
  marignRightSmall: {
    marginRight: sizes.SMALL,
  },
  marginLeftSmall: {
    marginLeft: sizes.SMALL,
  },
  marginRightMedium: {
    marginRight: sizes.MEDIUM,
  },
  marginTopMedium: {
    marginTop: sizes.MEDIUM,
  },
  marginBottomSmall: {
    marginBottom: sizes.SMALL,
  },
  marginBottomMedium: {
    marginBottom: sizes.MEDIUM,
  },
  marginHorizontalMedium: {
    marginHorizontal: sizes.MEDIUM,
  },
  marginVerticalMedium: {
    marginVertical: sizes.MEDIUM,
  },
  marginNegativeHorizontalMedium: {
    marginHorizontal: -sizes.MEDIUM,
  },
  marginLarge: {
    margin: sizes.LARGE,
  },
  marginBottomLarge: {
    marginBottom: sizes.LARGE,
  },

  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: sizes.SMALL,
  },
  paddingMedium: {
    padding: sizes.MEDIUM,
  },
  paddingTopMedium: {
    paddingTop: sizes.MEDIUM,
  },
  paddingHorizontalMedium: {
    paddingHorizontal: sizes.MEDIUM,
  },
  paddingLarge: {
    padding: sizes.LARGE,
  },

  h1: {
    fontSize: 22,
    fontWeight: '700',
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
  },
  h3: {
    fontSize: 15,
    fontWeight: '700',
  },

  lightText: {
    color: Colors.grayText,
  },
  thin: {
    fontWeight: '300',
  },
});
