import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { globalStyles } from '../../config/constants'

export function LoadingLayout() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={globalStyles.colors.steelBlue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
