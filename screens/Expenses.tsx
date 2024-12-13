import { useContext, useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import { Expense, Screens } from '../types'
import { getExpenses, isDateWithinLastNDays } from '../utils'
import ExpensesContext from '../context/ExpensesContext'
import { ExpensesOutput, FloatingButton } from '../components'
import { LoadingLayout } from '../components/UI/LoadingLayout'
import { ErrorLayout } from '../components/UI/ErrorLayout'

type ExpensesProps = {
  route: RouteProp<
    RootStackParamList,
    Screens.AllExpenses | Screens.RecentExpenses
  >
}

// Period in days
const PERIOD = 7

export function Expenses({ route }: Readonly<ExpensesProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [error, setError] = useState<string>(null)
  const {
    state: { refreshExpenses },
    setRefreshExpenses,
  } = useContext(ExpensesContext)

  useEffect(() => {
    async function fetchExpenses() {
      const response = await getExpenses()
      setIsLoading(false)

      if (response.ok && response.data) {
        if (route.name === Screens.AllExpenses) {
          setExpenses(response.data)
        }

        if (route.name === Screens.RecentExpenses) {
          const recentExpenses = response.data.filter((expense) =>
            isDateWithinLastNDays(expense.date, PERIOD),
          )
          setExpenses(recentExpenses)
        }
      }

      if (!response.ok && response.error) {
        setError('It was not possible to obtain the expenses')
      }
    }

    fetchExpenses()
  }, [refreshExpenses])

  const handleConfirm = () => {
    setError(null)
    setRefreshExpenses()
  }

  if (isLoading) {
    return <LoadingLayout />
  }

  if (!isLoading && error) {
    return <ErrorLayout message={error} onConfirm={handleConfirm} />
  }

  return (
    !isLoading &&
    expenses.length > 0 && (
      <>
        <ExpensesOutput
          expenses={expenses}
          expensesPeriod={
            route.name === Screens.AllExpenses ? 'Total' : `Last ${PERIOD} Days`
          }
        />
        <FloatingButton />
      </>
    )
  )
}
