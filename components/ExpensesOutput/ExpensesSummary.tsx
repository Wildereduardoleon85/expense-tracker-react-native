import { StyleSheet, Text, View } from 'react-native'
import { Expense } from '../../types'
import { globalStyles } from '../../config/constants'

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
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: globalStyles.colors.coral,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 24,
    ...globalStyles.lightShadowStyles,
  },
  period: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
})
