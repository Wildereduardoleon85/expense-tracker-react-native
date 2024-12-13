import { createContext } from 'react'
import { ExpensesState } from '../types'

type ExpensesContextProps = {
  state: ExpensesState
  setRefreshExpenses: () => void
}

const ExpensesContext = createContext({} as ExpensesContextProps)

export default ExpensesContext
