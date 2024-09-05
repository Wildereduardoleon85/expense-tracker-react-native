import { createContext } from 'react'
import { Expense, ExpensesState } from '../types'

type ExpensesContextProps = {
  state: ExpensesState
  addExpense: (expense: Omit<Expense, 'id'>) => void
  deleteExpense: (id: string) => void
  updateExpense: (
    id: string,
    updatedExpense: { description?: string; amount?: number; date?: Date },
  ) => void
}

const ExpensesContext = createContext({} as ExpensesContextProps)

export default ExpensesContext
