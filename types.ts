import { FontAwesome } from 'expo-vector-icons'

export enum Screens {
  RecentExpenses = 'RecentExpenses',
  AllExpenses = 'AllExpenses',
  ExpensesOverview = 'ExpensesOverview',
  EditExpense = 'EditExpense',
  AddExpense = 'AddExpense',
}

export type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap

export type Expense = {
  id: string
  description: string
  amount: number
  date: Date
}

export type ExpensesState = {
  refreshExpenses: boolean
}

export type InputNames = 'amount' | 'date' | 'description'

export type InputType = {
  hasBeenTouched: boolean
  value: string
  error: string
}

export type InputValues = {
  [key in InputNames]: InputType
}

export type ExpenseformInitialValues = {
  [key in InputNames]: string
}

export type ApiResponse<T = undefined> = T extends undefined
  ? {
      error: string
      ok: boolean
      data?: T
    }
  : {
      error: string
      ok: boolean
      data: T
    }
