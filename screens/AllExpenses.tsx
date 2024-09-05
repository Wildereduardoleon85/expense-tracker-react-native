import { useContext } from 'react'
import ExpensesContext from '../context/ExpensesContext'
import { FloatingButton, ExpensesOutput } from '../components'

export function AllExpenses() {
  const { state: DUMMY_EXPENSES } = useContext(ExpensesContext)

  return (
    <>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Total' />
      <FloatingButton />
    </>
  )
}
