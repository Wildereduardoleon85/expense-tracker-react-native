import { FlatList, Text } from 'react-native'
import { Expense } from '../../types'

type ExpensesListProps = {
  expenses: Expense[]
}

type ExpenseItemProps = {
  expense: Expense
}

function ExpenseItem({ expense }: Readonly<ExpenseItemProps>) {
  return <Text>{expense.description}</Text>
}

export function ExpensesList({ expenses }: Readonly<ExpensesListProps>) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}
