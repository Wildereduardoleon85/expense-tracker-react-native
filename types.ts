import { FontAwesome } from 'expo-vector-icons'

export enum Screens {
  RecentExpenses = 'RecentExpenses',
  AllExpenses = 'AllExpenses',
  ExpensesOverview = 'ExpensesOverview',
  ManageExpense = 'ManageExpense',
}

export type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap
