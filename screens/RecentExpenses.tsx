import { useContext } from 'react'
import ExpensesContext from '../context/ExpensesContext'
import { isDateWithinLastNDays } from '../utils'
import { FloatingButton, ExpensesOutput } from '../components'

// Period in days
const PERIOD = 7

export function RecentExpenses() {
  const { state: DUMMY_EXPENSES } = useContext(ExpensesContext)

  const recentExpenses = DUMMY_EXPENSES.filter((expense) =>
    isDateWithinLastNDays(expense.date, PERIOD),
  )

  return (
    <>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod={`Last ${PERIOD} Days`}
      />
      <FloatingButton />
    </>
  )
}
