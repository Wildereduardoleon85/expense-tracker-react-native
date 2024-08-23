import { useMemo, useReducer } from 'react'
import { Expense } from '../types'
import ExpensesContext from './ExpensesContext'
import expensesReducer from './expensesReducer'
import DUMMY_EXPENSES from '../data'

type ExpensesProviderProps = {
  children: JSX.Element | JSX.Element[]
}

function ExpensesProvider({ children }: Readonly<ExpensesProviderProps>) {
  const [state, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense(expense: Omit<Expense, 'id'>) {
    dispatch({
      type: 'addExpense',
      payload: expense,
    })
  }

  function deleteExpense(id: string) {
    dispatch({
      type: 'deleteExpense',
      payload: id,
    })
  }

  function updateExpense(id: string, expense: Expense) {
    dispatch({
      type: 'updateExpense',
      payload: {
        id,
        expense,
      },
    })
  }

  const memoizedState = useMemo(
    () => ({
      state,
      addExpense,
      deleteExpense,
      updateExpense,
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
