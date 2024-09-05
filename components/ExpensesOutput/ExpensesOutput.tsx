import { StyleSheet, View } from 'react-native'
import { Expense } from '../../types'
import { ExpensesSummary } from './ExpensesSummary'
import { ExpensesList } from './ExpensesList'

type ExpensesOutputProps = {
  expenses: Expense[]
  expensesPeriod: string
}

export function ExpensesOutput({
  expenses,
  expensesPeriod,
}: Readonly<ExpensesOutputProps>) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
