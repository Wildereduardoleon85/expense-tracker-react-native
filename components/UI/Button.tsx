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
}

export function Button({
  children,
  onPress,
  rootStyles,
  innerContainerStyles,
  textStyles,
  enableShadow = true,
  color = globalStyles.colors.steelBlue,
}: Readonly<ButtonProps>) {
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: color },
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
      >
        <View style={[styles.innerContainer, innerContainerStyles]}>
          {typeof children === 'string' ? (
            <Text style={[styles.text, textStyles]}>{children}</Text>
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
    color: 'white',
    fontSize: 16,
  },
})
