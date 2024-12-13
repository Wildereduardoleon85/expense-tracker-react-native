import axios from 'axios'
import { FIREBASE_API_BASE_URL } from '@env'
import { ApiResponse, Expense } from '../types'

export async function storeExpense(
  expense: Omit<Expense, 'id'>,
): Promise<ApiResponse<{ expenseId: string }>> {
  try {
    const response = await axios.post(
      `${FIREBASE_API_BASE_URL}/expenses.json`,
      expense,
    )
    return {
      error: null,
      ok: true,
      data: {
        expenseId: response.data.name,
      },
    }
  } catch (error) {
    console.error('Failed to fetch expenses:', error)
    return {
      error:
        error?.message ?? 'An unknown error occurred while adding an expense.',
      ok: false,
      data: null,
    }
  }
}

export async function getExpenses(): Promise<ApiResponse<Expense[]>> {
  try {
    const response = await axios.get(`${FIREBASE_API_BASE_URL}/expenses.json`)

    const expenses: Expense[] = []

    Object.entries(response.data).forEach((entries) => {
      const key: string = entries[0]
      const value = entries[1] as Omit<Expense, 'id'>

      expenses.push({
        id: key,
        amount: value.amount,
        date: new Date(value.date),
        description: value.description,
      })
    })

    return {
      ok: true,
      data: expenses,
      error: null,
    }
  } catch (error) {
    console.error('Failed to fetch expenses:', error)
    return {
      ok: false,
      data: null,
      error:
        error?.message ?? 'An unknown error occurred while fetching expenses.',
    }
  }
}

export async function getExpenseById(
  id: string,
): Promise<ApiResponse<Omit<Expense, 'id' | 'date'> & { date: string }>> {
  try {
    const response = await axios.get(
      `${FIREBASE_API_BASE_URL}/expenses/${id}.json`,
    )

    return {
      data: response.data,
      error: null,
      ok: true,
    }
  } catch (error) {
    console.error(`Failed to fetch expense with id: ${id}:`, error)
    return {
      ok: false,
      data: null,
      error:
        error?.message ?? 'An unknown error occurred while fetching expense.',
    }
  }
}

export async function updateExpense(
  id: string,
  updatedExpense: Omit<Expense, 'id'>,
): Promise<ApiResponse> {
  try {
    await axios.put(
      `${FIREBASE_API_BASE_URL}/expenses/${id}.json`,
      updatedExpense,
    )
    return {
      error: null,
      ok: true,
    }
  } catch (error) {
    console.error(`Failed to update expense with id: ${id}:`, error)
    return {
      error:
        error?.message ?? 'An unknown error occurred while updating expense.',
      ok: false,
    }
  }
}

export async function deleteExpense(id: string): Promise<ApiResponse> {
  try {
    await axios.delete(`${FIREBASE_API_BASE_URL}/expenses/${id}.json`)
    return {
      error: null,
      ok: true,
    }
  } catch (error) {
    return {
      error:
        error?.message ?? 'An unknown error occurred while deleting expense.',
      ok: false,
    }
  }
}
