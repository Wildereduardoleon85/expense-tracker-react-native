import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesomeIconName, Screens } from '../types'
import { RecentExpenses } from '../screens/RecentExpenses'
import { ManageExpense } from '../screens/ManageExpense'
import { AllExpenses } from '../screens/AllExpenses'
import { Header } from './Header'
import { theme } from '../config/theme'

export type RootStackParamList = {
  RecentExpenses: undefined
  AllExpenses: undefined
  ExpensesOverview: undefined
  ManageExpense: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTabs = createBottomTabNavigator<RootStackParamList>()
const header = (options: BottomTabNavigationOptions) => (
  <Header options={options} />
)
const icon = (size: number, color: string, iconName: FontAwesomeIconName) => (
  <FontAwesome size={size} color={color} name={iconName} />
)
const screenDefaultoptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    height: 72,
    paddingBottom: 12,
    paddingTop: 12,
  },
  tabBarLabelStyle: {
    fontWeight: 'bold',
  },
  tabBarInactiveTintColor: theme.colors.textLight,
  headerTitleAlign: 'center',
  headerTitleStyle: { color: 'white' },
}

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        header: ({ options }) => header(options),
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <BottomTabs.Screen
        name={Screens.RecentExpenses}
        component={RecentExpenses}
        options={{
          ...screenDefaultoptions,
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ size, color }) => icon(size, color, 'hourglass-1'),
        }}
      />
      <BottomTabs.Screen
        name={Screens.AllExpenses}
        component={AllExpenses}
        options={{
          ...screenDefaultoptions,
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ size, color }) => icon(size, color, 'calendar'),
        }}
      />
    </BottomTabs.Navigator>
  )
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.ExpensesOverview}
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={Screens.ManageExpense} component={ManageExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
