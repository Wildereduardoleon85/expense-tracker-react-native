import { useMemo, useReducer } from 'react'
import { ExpensesState } from '../types'
import ExpensesContext from './ExpensesContext'
import expensesReducer from './expensesReducer'

type ExpensesProviderProps = {
  children: JSX.Element | JSX.Element[]
}

const initialState: ExpensesState = {
  refreshExpenses: false,
}

function ExpensesProvider({ children }: Readonly<ExpensesProviderProps>) {
  const [state, dispatch] = useReducer(expensesReducer, initialState)

  function setRefreshExpenses() {
    dispatch({ type: 'setRefreshExpenses' })
  }

  const memoizedState = useMemo(
    () => ({
      state,
      setRefreshExpenses,
    }),
    [state, dispatch],
  )

  return (
    <ExpensesContext.Provider value={memoizedState}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesProvider
