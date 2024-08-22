import { Pressable, StyleSheet, View } from 'react-native'
import { FontAwesome } from 'expo-vector-icons'
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import { globalStyles } from '../config/constants'
import { Screens } from '../types'

const BUTTON_DIAMETER = 50

export function FloatingButton() {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>()

  const onPressHandler = () => {
    navigate(Screens.ManageExpense)
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <FontAwesome name='plus' size={16} color='white' />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  button: {
    width: BUTTON_DIAMETER,
    height: BUTTON_DIAMETER,
    backgroundColor: globalStyles.colors.steelBlue,
    borderRadius: BUTTON_DIAMETER / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  pressed: {
    opacity: 0.75,
  },
})
