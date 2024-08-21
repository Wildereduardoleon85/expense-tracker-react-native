import { Text, View } from 'react-native'
import { Expense } from '../../types'

type ExpensesSummaryProps = {
  periodName: string
  expenses: Expense[]
}

export function ExpensesSummary({
  periodName,
  expenses,
}: Readonly<ExpensesSummaryProps>) {
  const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}
