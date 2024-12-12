import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import { Expense, Screens } from '../../types'
import { globalStyles } from '../../config/constants'
import { formatDate } from '../../utils'

type ExpenseItemProps = {
  expense: Expense
  style?: StyleProp<ViewStyle>
}

export function ExpenseItem({ expense, style }: Readonly<ExpenseItemProps>) {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>()

  const onExpensePressHandler = () => {
    navigate(Screens.ManageExpense, { expenseId: expense.id })
  }

  return (
    <View style={[style, styles.container]}>
      <Pressable
        android_ripple={{ color: globalStyles.colors.ripple }}
        onPress={onExpensePressHandler}
        style={({ pressed }) =>
          pressed && Platform.OS !== 'android' ? styles.pressed : null
        }
      >
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.description}>{expense.description}</Text>
            <Text style={styles.date}>{formatDate(expense.date)}</Text>
          </View>
          <View>
            <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: globalStyles.borderRadius,
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 12,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    ...globalStyles.lightShadowStyles,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  pressed: {
    opacity: 0.5,
  },
  description: {
    fontWeight: 'bold',
  },
  date: {
    color: globalStyles.colors.lightGrey,
    fontWeight: 'bold',
    marginTop: 4,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
