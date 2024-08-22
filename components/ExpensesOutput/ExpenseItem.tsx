import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { Expense } from '../../types'
import { globalStyles } from '../../config/constants'
import { formatDate } from '../../utils'

type ExpenseItemProps = {
  expense: Expense
  style?: StyleProp<ViewStyle>
}

export function ExpenseItem({ expense, style }: Readonly<ExpenseItemProps>) {
  return (
    <Pressable>
      <View style={[style, styles.container]}>
        <View>
          <Text style={styles.description}>{expense.description}</Text>
          <Text style={styles.date}>{formatDate(expense.date)}</Text>
        </View>
        <View>
          <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: globalStyles.borderRadius,
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 12,
    ...globalStyles.shadowStyles,
  },
  description: {
    fontWeight: 'bold',
  },
  date: {
    color: globalStyles.colors.textLight,
    fontWeight: 'bold',
    marginTop: 4,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
