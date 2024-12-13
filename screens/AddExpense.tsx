import { View } from 'react-native'
import { useContext, useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { ErrorLayout, ExpenseForm } from '../components'
import { Expense } from '../types'
import { storeExpense } from '../utils'
import ExpensesContext from '../context/ExpensesContext'

type AddExpenseProps = {
  navigation: NavigationProp<ParamListBase>
}

export function AddExpense({ navigation }: Readonly<AddExpenseProps>) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const { setRefreshExpenses } = useContext(ExpensesContext)

  const handleCancel = () => {
    navigation.goBack()
  }

  const handleSubmit = async (expense: Omit<Expense, 'id'>) => {
    setIsSubmitting(true)
    const response = await storeExpense(expense)
    setIsSubmitting(false)

    if (response.ok) {
      setRefreshExpenses()
      navigation.goBack()
    } else {
      setError('An error ocurred when trying to add an expense')
    }
  }

  const handleConfirm = () => {
    setError(null)
  }

  if (error) {
    return <ErrorLayout message={error} onConfirm={handleConfirm} />
  }

  return (
    <View>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </View>
  )
}
