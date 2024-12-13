import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import { Button } from './Button'

type ErrorLayoutProps = {
  message: string
  onConfirm?: (event: GestureResponderEvent) => void
}

export function ErrorLayout({
  message,
  onConfirm,
}: Readonly<ErrorLayoutProps>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button rootStyles={styles.button} onPress={onConfirm}>
        Okay
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 500,
  },
  message: {
    textAlign: 'center',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
})
