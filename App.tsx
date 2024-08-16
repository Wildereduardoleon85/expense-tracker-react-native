import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Screens } from './types'
import { AllExpenses, ManageExpense, RecentExpenses } from './screens'

export type RootStackParamList = {
  RecentExpenses: undefined
  AllExpenses: undefined
  ExpensesOverview: undefined
  ManageExpense: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTabs = createBottomTabNavigator<RootStackParamList>()

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name={Screens.RecentExpenses}
        component={RecentExpenses}
      />
      <BottomTabs.Screen name={Screens.AllExpenses} component={AllExpenses} />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Screens.ExpensesOverview}
            component={ExpensesOverview}
          />
          <Stack.Screen
            name={Screens.ManageExpense}
            component={ManageExpense}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
