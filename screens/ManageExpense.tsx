import { useLayoutEffect } from 'react'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Screens } from '../types'
import { RootStackParamList } from '../App'
import { Button, IconButton } from '../components'
import { globalStyles } from '../config/constants'

type ManageExpenseProps = {
  route: RouteProp<RootStackParamList, Screens.ManageExpense>
  navigation: NavigationProp<ParamListBase>
}

export function ManageExpense({
  route,
  navigation,
}: Readonly<ManageExpenseProps>) {
  const expenseId = route.params?.expenseId
  const isEditScreen = !!expenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditScreen])

  const onCancelPressHandler = () => {
    navigation.goBack()
  }

  const onConfirm = () => {
    navigation.goBack()
  }

  const onDeleteHandler = () => {
    navigation.goBack()
  }

  return (
    <View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={onCancelPressHandler}
          rootStyles={styles.button}
          color={globalStyles.colors.coral}
        >
          Cancel
        </Button>
        <Button onPress={onConfirm} rootStyles={styles.button}>
          {isEditScreen ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditScreen && (
        <>
          <View style={styles.divider} />
          <IconButton
            onPress={onDeleteHandler}
            rootStyles={styles.icon}
            color={globalStyles.colors.coral}
            icon={{ name: 'trash' }}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 24,
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: globalStyles.colors.textLight,
    width: '90%',
    marginTop: 12,
    marginHorizontal: 'auto',
  },
  button: {
    width: '48%',
  },
  icon: {
    marginHorizontal: 'auto',
    marginTop: 12,
  },
})
