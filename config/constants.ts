export const globalStyles = {
  colors: {
    steelBlue: '#456efe',
    coral: '#ff6581',
    blueishPurple: '#6b47f7',
    redishPurple: '#a03eff',
    lightGrey: '#a4a4ab',
    darkGrey: '#727277',
    ripple: '#ccc',
    error: '#cc5067',
    veryLightGrey: '#dadadd',
  },
  borderRadius: 14,
  lightShadowStyles: {
    shadowColor: '#49494c', // Shadow color (black) (IOS)
    shadowOffset: { width: 1, height: 1 }, // Shadow offset with a positive y value for the bottom shadow (IOS)
    shadowOpacity: 0.4, // Shadow opacity (IOS)
    shadowRadius: 4, // Shadow radius (IOS)
    elevation: 3, // (Android)
  },
  darkerShadowStyles: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
}
