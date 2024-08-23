import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ExpensesSummary, ExpensesList } from '..'
import { Expense } from '../../types'
import ExpensesContext from '../../context/ExpensesContext'

type ExpensesOutputProps = {
  expenses: Expense[]
  expensesPeriod: string
}

export function ExpensesOutput({
  expenses,
  expensesPeriod,
}: Readonly<ExpensesOutputProps>) {
  const { state: DUMMY_EXPENSES } = useContext(ExpensesContext)

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
