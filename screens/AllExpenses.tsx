import { ExpensesOutput, FloatingButton } from '../components'
import DUMMY_EXPENSES from '../data/data'

export function AllExpenses() {
  return (
    <>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Total' />
      <FloatingButton />
    </>
  )
}
