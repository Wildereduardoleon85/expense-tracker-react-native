import { StyleSheet } from 'react-native'
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import { Screens } from '../types'
import { IconButton } from './UI'

export function FloatingButton() {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>()

  const onAddExpensePressHandler = () => {
    navigate(Screens.ManageExpense)
  }

  return (
    <IconButton
      onPress={onAddExpensePressHandler}
      rootStyles={styles.root}
      icon={{ name: 'plus', size: 18 }}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
})
