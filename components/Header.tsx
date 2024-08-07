import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native-paper'
import { theme } from '../config/theme'

type HeaderProps = {
  options: BottomTabNavigationOptions
}

export function Header({ options }: Readonly<HeaderProps>) {
  return (
    <LinearGradient
      colors={[theme.colors.redishPurple, theme.colors.blueishPurple]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{options.title}</Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
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
