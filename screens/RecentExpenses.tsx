import { ExpensesOutput } from '../components'
import DUMMY_EXPENSES from '../data/data'

export function RecentExpenses() {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Last 7 Days' />
  )
}
