import { ExpensesState } from '../types'

type ExpensesAction = { type: 'setRefreshExpenses' }

function productReducer(
  state: ExpensesState,
  action: ExpensesAction,
): ExpensesState {
  switch (action.type) {
    case 'setRefreshExpenses':
      return {
        ...state,
        refreshExpenses: !state.refreshExpenses,
      }

    default:
      return state
  }
}

export default productReducer
