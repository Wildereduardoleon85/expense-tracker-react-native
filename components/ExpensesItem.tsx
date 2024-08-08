import { StyleSheet, View } from 'react-native'
import { Card, Chip, Text, TouchableRipple } from 'react-native-paper'
import { theme } from '../config/theme'

type ExpensesItemProps = {
  expense: {
    id: string
    title: string
    date: string
    price: number
  }
  isLast: boolean
}

export function ExpensesItem({ expense, isLast }: Readonly<ExpensesItemProps>) {
  const handleExpenseItemPress = () => {
    console.log('pressed')
  }

  return (
    <Card style={[styles.card, { marginBottom: isLast ? 16 : 0 }]}>
      <TouchableRipple onPress={handleExpenseItemPress}>
        <Card.Content style={styles.cardContent}>
          <View>
            <Text>{expense.title}</Text>
            <Text>{expense.date}</Text>
          </View>
          <View>
            <Chip style={styles.chip}>
              <Text style={styles.chipText}>{expense.price}</Text>
            </Chip>
          </View>
        </Card.Content>
      </TouchableRipple>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    backgroundColor: 'white',
    marginTop: 16,
    marginHorizontal: 'auto',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  chip: {
    backgroundColor: theme.colors.secondary,
  },
  chipText: {
    color: 'white',
  },
})
