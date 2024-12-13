import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import { ExpenseForm, IconButton } from '../components'
import { globalStyles } from '../config/constants'
import { RootStackParamList } from '../App'
import { Expense, Screens } from '../types'
import { deleteExpense, getExpenseById, updateExpense } from '../utils'
import { ErrorLayout, LoadingLayout } from '../components/UI'
import ExpensesContext from '../context/ExpensesContext'

type EditExpenseProps = {
  route: RouteProp<RootStackParamList, Screens.EditExpense>
  navigation: NavigationProp<ParamListBase>
}

type ErrorTypes =
  | 'deleteExpense'
  | 'getExpense'
  | 'updateExpense'
  | 'expenseNotFound'

type Error = {
  type: ErrorTypes
  message: string
}

export function EditExpense({ route, navigation }: Readonly<EditExpenseProps>) {
  const expenseId = route.params?.expenseId
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedExpense, setSelectedExpense] = useState<Expense>(null)
  const [error, setError] = useState<Error>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const { setRefreshExpenses } = useContext(ExpensesContext)

  useEffect(() => {
    async function fetchExpenseById() {
      if (!expenseId) return

      const response = await getExpenseById(expenseId)
      setIsLoading(false)

      if (response.ok && response.data) {
        setSelectedExpense({
          ...response.data,
          id: expenseId,
          date: new Date(response.data.date),
        })
      }

      if (response.ok && !response.data) {
        setError({
          type: 'expenseNotFound',
          message: `Expense with id ${expenseId} not found`,
        })
      }

      if (!response.ok) {
        setError({
          type: 'getExpense',
          message: `Failed to fetch expense with id ${expenseId}`,
        })
      }
    }

    fetchExpenseById()
  }, [expenseId])

  const handleDelete = async () => {
    setIsDeleting(true)
    const response = await deleteExpense(expenseId)
    setIsDeleting(false)

    if (response.ok) {
      navigation.goBack()
      setRefreshExpenses()
    } else {
      setError({
        type: 'deleteExpense',
        message: 'An error ocurred when trying to delete an expense',
      })
    }
  }

  const handleCancel = () => {
    navigation.goBack()
  }

  const handleConfirm = () => {
    if (error.type === 'expenseNotFound' || error.type === 'getExpense') {
      setError(null)
      navigation.goBack()
    } else {
      setError(null)
    }
  }

  const handleSubmit = async (updatedExpense: Omit<Expense, 'id'>) => {
    setIsSubmitting(true)
    const response = await updateExpense(expenseId, updatedExpense)
    setIsSubmitting(false)

    if (response.ok) {
      setRefreshExpenses()
      navigation.goBack()
    } else {
      setError({
        type: 'updateExpense',
        message: 'An error ocurred when trying to update an expense',
      })
    }
  }

  if (isLoading) {
    return <LoadingLayout />
  }

  if (!isLoading && error) {
    return <ErrorLayout message={error.message} onConfirm={handleConfirm} />
  }

  return (
    !isLoading &&
    !error &&
    selectedExpense && (
      <View>
        <ExpenseForm
          onSubmit={handleSubmit}
          selectedExpense={selectedExpense}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
        <>
          <View style={styles.divider} />
          <IconButton
            isLoading={isDeleting}
            disabled={isDeleting}
            onPress={handleDelete}
            rootStyles={styles.icon}
            color={globalStyles.colors.coral}
            icon={{ name: 'trash' }}
          />
        </>
      </View>
    )
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
