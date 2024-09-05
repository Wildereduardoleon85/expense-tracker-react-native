import { useContext, useLayoutEffect } from 'react'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Screens } from '../types'
import { RootStackParamList } from '../App'
import { globalStyles } from '../config/constants'
import { Button, IconButton } from '../components'
import ExpensesContext from '../context/ExpensesContext'

type ManageExpenseProps = {
  route: RouteProp<RootStackParamList, Screens.ManageExpense>
  navigation: NavigationProp<ParamListBase>
}

export function ManageExpense({
  route,
  navigation,
}: Readonly<ManageExpenseProps>) {
  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext)
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

  const onConfirmHandler = () => {
    if (isEditScreen) {
      updateExpense(expenseId, { description: 'A star wars book' })
    } else {
      addExpense({
        amount: 19.99,
        date: new Date(2024, 6, 20, 20, 30),
        description: 'Test',
      })
    }
    navigation.goBack()
  }

  const onDeleteHandler = () => {
    deleteExpense(expenseId)
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
        <Button onPress={onConfirmHandler} rootStyles={styles.button}>
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
