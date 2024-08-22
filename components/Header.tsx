import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, Text } from 'react-native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { globalStyles } from '../config/constants'
import { IconButton } from './IconButton'

export type HeaderProps = {
  options: NativeStackNavigationOptions | BottomTabNavigationOptions
  navigation: NavigationProp<ParamListBase>
}

const BUTTON_SIZE = 40

export function Header({ options, navigation }: Readonly<HeaderProps>) {
  const onBackButtonPressHandler = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[
          globalStyles.colors.redishPurple,
          globalStyles.colors.blueishPurple,
        ]}
      >
        <View style={styles.innerContainer}>
          {(options as NativeStackNavigationOptions).headerBackVisible && (
            <IconButton
              size={BUTTON_SIZE}
              onPress={onBackButtonPressHandler}
              rootStyles={styles.iconButtonContainer}
              buttonStyles={styles.iconButton}
              enableSahdow={false}
              icon={{ name: 'arrow-left', color: 'white', size: 18 }}
            />
          )}
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
    justifyContent: 'center',
    padding: 16,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  iconButtonContainer: {
    position: 'absolute',
    left: 4,
    top: '100%',
    transform: [{ translateY: (BUTTON_SIZE / 2) * -1 }],
  },
  iconButton: {
    backgroundColor: 'transparent',
  },
})
