import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, Text } from 'react-native'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { globalStyles } from '../config/constants'

export function Header({ options }: Readonly<BottomTabHeaderProps>) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[
          globalStyles.colors.redishPurple,
          globalStyles.colors.blueishPurple,
        ]}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{options.title}</Text>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    shadowColor: '#000', // Shadow color (black) (IOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset with a positive y value for the bottom shadow (IOS)
    shadowOpacity: 0.25, // Shadow opacity (IOS)
    shadowRadius: 5, // Shadow radius (IOS)
    elevation: 10, // (Android)
  },
  innerContainer: {
    marginTop: 32,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
})
