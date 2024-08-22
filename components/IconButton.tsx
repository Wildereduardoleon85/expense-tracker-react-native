import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { FontAwesome } from 'expo-vector-icons'
import { globalStyles } from '../config/constants'
import { FontAwesomeIconName } from '../types'

type IconButtonProps = {
  /**
   * Options to set the icon displayed, the default size is 24
   * and default color is white
   */
  icon: {
    name: FontAwesomeIconName
    size?: number
    color?: string
  }
  /**
   * The size of the etire button. Default value is 50
   */
  size?: number
  /**
   * Styles applied to the button itself, for example: backgroundColor,
   * borderRadius, etc.
   */
  buttonStyles?: StyleProp<ViewStyle>
  /**
   * Styles applied to the root container, use this for positioning, margin,
   * etc.
   */
  rootStyles?: StyleProp<ViewStyle>
  /**
   * Event triggered when button is pressed
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Determines if the shadow of the element is shown, default value is true
   */
  enableSahdow?: boolean
}

export function IconButton({
  icon,
  size = 50,
  buttonStyles,
  rootStyles,
  onPress,
  enableSahdow = true,
}: Readonly<IconButtonProps>) {
  const buttonSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  const shadowStyles = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  }

  return (
    <View style={rootStyles}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            { ...buttonSize, ...(enableSahdow && shadowStyles) },
            styles.button,
            buttonStyles,
          ]}
        >
          <FontAwesome
            name={icon.name}
            size={icon.size ?? 24}
            color={icon.color ?? 'white'}
          />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyles.colors.steelBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
})
