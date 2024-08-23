import { createContext } from 'react'
import { Expense, ExpensesState } from '../types'

type ExpensesContextProps = {
  state: ExpensesState
  addExpense: (expense: Omit<Expense, 'id'>) => void
  deleteExpense: (id: string) => void
  updateExpense: (id: string, expense: Expense) => void
}

const ExpensesContext = createContext({} as ExpensesContextProps)

export default ExpensesContext
