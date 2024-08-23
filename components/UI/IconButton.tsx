import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { FontAwesome } from 'expo-vector-icons'
import { globalStyles } from '../../config/constants'
import { FontAwesomeIconName } from '../../types'

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
  /**
   * Use this to set the backgroundColor of the button
   */
  color?: string
}

export function IconButton({
  icon,
  size = 50,
  buttonStyles,
  rootStyles,
  onPress,
  enableSahdow = true,
  color = globalStyles.colors.steelBlue,
}: Readonly<IconButtonProps>) {
  const buttonSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  return (
    <View style={rootStyles}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            {
              ...buttonSize,
              ...(enableSahdow && globalStyles.darkerShadowStyles),
              backgroundColor: color,
            },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
})
