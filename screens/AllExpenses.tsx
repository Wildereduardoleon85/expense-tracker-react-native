import { useContext } from 'react'
import { ExpensesOutput, FloatingButton } from '../components'
import ExpensesContext from '../context/ExpensesContext'

export function AllExpenses() {
  const { state: DUMMY_EXPENSES } = useContext(ExpensesContext)

  return (
    <>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Total' />
      <FloatingButton />
    </>
  )
}
