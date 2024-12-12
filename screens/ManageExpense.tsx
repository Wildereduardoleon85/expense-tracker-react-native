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
import { IconButton } from '../components'
import ExpensesContext from '../context/ExpensesContext'
import { ExpenseForm } from '../components/ManageExpense'

type ManageExpenseProps = {
  route: RouteProp<RootStackParamList, Screens.ManageExpense>
  navigation: NavigationProp<ParamListBase>
}

export function ManageExpense({
  route,
  navigation,
}: Readonly<ManageExpenseProps>) {
  const { deleteExpense } = useContext(ExpensesContext)
  const expenseId = route.params?.expenseId
  const isEditScreen = !!expenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditScreen])

  const handleCancel = () => {
    navigation.goBack()
  }

  const handleDelete = () => {
    deleteExpense(expenseId)
    navigation.goBack()
  }

  return (
    <View>
      <ExpenseForm onCancel={handleCancel} />
      {isEditScreen && (
        <>
          <View style={styles.divider} />
          <IconButton
            onPress={handleDelete}
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
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: globalStyles.colors.lightGrey,
    width: '90%',
    marginTop: 12,
    marginHorizontal: 'auto',
  },
  icon: {
    marginHorizontal: 'auto',
    marginTop: 12,
  },
})
