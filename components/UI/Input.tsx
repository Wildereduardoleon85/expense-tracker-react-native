import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { globalStyles } from '../../config/constants'

type InputProps = {
  label?: string
  textInputProps?: TextInputProps
  labelStyles?: StyleProp<TextStyle>
  inputContainerStyles?: StyleProp<ViewStyle>
  error?: string
}

/**
 * A customizable input component that displays a label and a text input field.
 *
 * @param {object} props - The props for the `Input` component.
 * @param {string} props.label - The text to display as the label for the input field.
 * @param {TextInputProps} [props.textInputProps] - Props to be passed to the `TextInput` component.
 * @param {StyleProp<TextStyle>} [props.labelStyles] - Styles to apply to the label `Text` component.
 * @param {string} [props.error] - Error text that when passes shows a an error message below the input.
 * @param {StyleProp<ViewStyle>} [props.inputContainerStyles] - Styles to apply to the container
 * `View` component which is the one that holds both, Text and TexInput components.
 * @returns {JSX.Element} The rendered input component.
 */
export function Input({
  label,
  labelStyles,
  textInputProps,
  inputContainerStyles,
  error,
}: Readonly<InputProps>): JSX.Element {
  const inputStyles = [
    styles.input, // Default styles
    textInputProps?.multiline && styles.inputMultiline, // Conditional default styles
    textInputProps?.style, // External styles
  ]

  return (
    <View style={inputContainerStyles}>
      {!!label && <Text style={[styles.label, labelStyles]}>{label}</Text>}
      <TextInput {...textInputProps} style={inputStyles} />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: globalStyles.colors.darkGrey,
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: globalStyles.colors.error,
    fontWeight: 500,
  },
})
