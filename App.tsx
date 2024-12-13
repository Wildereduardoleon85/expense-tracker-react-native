import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome } from 'expo-vector-icons'
import { FontAwesomeIconName, Screens } from './types'
import { Expenses, EditExpense, AddExpense } from './screens'
import { Header, TabBar, HeaderProps } from './components'
import ExpensesProvider from './context/ExpenseProvider'

export type RootStackParamList = {
  RecentExpenses: undefined
  AllExpenses: undefined
  ExpensesOverview: undefined
  AddExpense: undefined
  EditExpense: { expenseId: string }
}

type TabBarIconProps = {
  focused: boolean
  color: string
  size: number
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTabs = createBottomTabNavigator<RootStackParamList>()
const header = (headerProps: HeaderProps) => <Header {...headerProps} />
const tabBar = (bottomTabBarProps: BottomTabBarProps) => (
  <TabBar {...bottomTabBarProps} />
)
const icon = (
  iconName: FontAwesomeIconName,
  tabBarIconProps: TabBarIconProps,
) => (
  <FontAwesome
    name={iconName}
    size={tabBarIconProps.size}
    color={tabBarIconProps.color}
  />
)

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        header,
      }}
      tabBar={tabBar}
    >
      <BottomTabs.Screen
        name={Screens.RecentExpenses}
        component={Expenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: (tabBarIconProps) => icon('hourglass-2', tabBarIconProps),
        }}
      />
      <BottomTabs.Screen
        name={Screens.AllExpenses}
        component={Expenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: (tabBarIconProps) => icon('calendar', tabBarIconProps),
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <ExpensesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name={Screens.ExpensesOverview}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name={Screens.AddExpense}
              component={AddExpense}
              options={{
                header,
                headerBackVisible: true,
                title: 'Add Expense',
              }}
            />
            <Stack.Screen
              name={Screens.EditExpense}
              component={EditExpense}
              options={{
                header,
                headerBackVisible: true,
                title: 'Edit Expense',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    </>
  )
}
