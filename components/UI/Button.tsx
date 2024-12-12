import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { globalStyles } from '../../config/constants'

type ButtonProps = {
  children: React.ReactNode
  onPress?: (event: GestureResponderEvent) => void
  rootStyles?: StyleProp<ViewStyle>
  innerContainerStyles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
  enableShadow?: boolean
  color?: string
  disabled?: boolean
}

export function Button({
  children,
  onPress,
  rootStyles,
  innerContainerStyles,
  textStyles,
  enableShadow = true,
  color = globalStyles.colors.steelBlue,
  disabled = false,
}: Readonly<ButtonProps>) {
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: disabled ? globalStyles.colors.veryLightGrey : color,
        },
        { ...(enableShadow && globalStyles.darkerShadowStyles) },
        rootStyles,
      ]}
    >
      <Pressable
        style={({ pressed }) =>
          pressed && Platform.OS !== 'android' ? styles.pressed : null
        }
        onPress={onPress}
        android_ripple={{ color: globalStyles.colors.ripple }}
        disabled={disabled}
      >
        <View style={[styles.innerContainer, innerContainerStyles]}>
          {typeof children === 'string' ? (
            <Text
              style={[
                styles.text,
                { color: disabled ? globalStyles.colors.lightGrey : 'white' },
                textStyles,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderRadius: globalStyles.borderRadius,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    minWidth: 60,
  },
  pressed: {
    opacity: 0.5,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 16,
  },
})
