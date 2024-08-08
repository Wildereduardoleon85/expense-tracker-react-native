import { FlatList } from 'react-native'
import expenses from '../data/data.json'
import { ExpensesItem } from './ExpensesItem'

export function ExpensesList() {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item, index }) => (
        <ExpensesItem expense={item} isLast={index === expenses.length - 1} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
