import { FlatList } from 'react-native'
import { Expense } from '../../types'
import { ExpenseItem } from '..'

type ExpensesListProps = {
  expenses: Expense[]
}

export function ExpensesList({ expenses }: Readonly<ExpensesListProps>) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item, index }) => (
        <ExpenseItem
          style={{
            marginBottom: index === expenses.length - 1 ? 28 : 0,
          }}
          expense={item}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
