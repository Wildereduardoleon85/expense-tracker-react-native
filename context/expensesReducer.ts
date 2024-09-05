import { Expense, ExpensesState } from '../types'
import { generateUniqueId } from '../utils'

type ExpensesAction =
  | { type: 'addExpense'; payload: Omit<Expense, 'id'> }
  | { type: 'deleteExpense'; payload: string }
  | {
      type: 'updateExpense'
      payload: {
        id: string
        updatedExpense: { description?: string; amount?: number; date?: Date }
      }
    }

function productReducer(
  state: ExpensesState,
  action: ExpensesAction,
): ExpensesState {
  switch (action.type) {
    case 'addExpense':
      return [...state, { id: generateUniqueId(), ...action.payload }]

    case 'deleteExpense':
      return state.filter((expense) => expense.id !== action.payload)

    case 'updateExpense': {
      const { description, amount, date } = action.payload.updatedExpense
      const updatedExpenses = state.map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            id: expense.id,
            description: description ?? expense.description,
            amount: amount ?? expense.amount,
            date: date ?? expense.date,
          }
        }
        return expense
      })

      return updatedExpenses
    }

    default:
      return state
  }
}

export default productReducer
