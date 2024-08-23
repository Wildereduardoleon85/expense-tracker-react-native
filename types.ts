import { FontAwesome } from 'expo-vector-icons'

export enum Screens {
  RecentExpenses = 'RecentExpenses',
  AllExpenses = 'AllExpenses',
  ExpensesOverview = 'ExpensesOverview',
  ManageExpense = 'ManageExpense',
}

export type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap

export type Expense = {
  id: string
  description: string
  amount: number
  date: Date
}

export type ExpensesState = Expense[]
