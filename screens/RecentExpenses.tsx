import { useContext } from 'react'
import { ExpensesOutput, FloatingButton } from '../components'
import ExpensesContext from '../context/ExpensesContext'

export function RecentExpenses() {
  const { state: DUMMY_EXPENSES } = useContext(ExpensesContext)

  return (
    <>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Last 7 Days' />
      <FloatingButton />
    </>
  )
}
