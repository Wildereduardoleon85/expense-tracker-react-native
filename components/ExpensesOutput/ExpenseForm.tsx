import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { globalStyles } from '../../config/constants'
import { Button, Input } from '../UI'
import { RootStackParamList } from '../../App'
import { useExpenseformInputs } from '../../hooks'
import { Expense, ExpenseformInitialValues, InputType } from '../../types'
import { capitalize } from '../../utils'

type ExpenseFormProps = {
  onCancel: () => void
  selectedExpense?: Expense
  onSubmit: (expense: Omit<Expense, 'id'>) => Promise<void>
  isSubmitting: boolean
}

const inputsConfig = {
  amount: {
    keyboardType: 'decimal-pad',
    placeholder: '$145.99',
  },
  description: {
    multiline: true,
    placeholder: 'A pair of shoes.',
  },
  date: {
    maxLength: 10,
    keyboardType: 'number-pad',
    placeholder: 'YYYY-MM-DD',
  },
}

export function ExpenseForm({
  onCancel,
  selectedExpense = null,
  onSubmit,
  isSubmitting,
}: Readonly<ExpenseFormProps>) {
  const route = useRoute<RouteProp<RootStackParamList>>()
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(true)
  const expenseId = route.params?.expenseId
  const isEditScreen = !!expenseId
  const initialValues: ExpenseformInitialValues = selectedExpense && {
    amount: String(selectedExpense.amount),
    date: selectedExpense.date.toISOString().split('T')[0],
    description: selectedExpense.description,
  }
  const inputs = useExpenseformInputs(initialValues)
  const hasBeenTouched = (input: InputType) => input.hasBeenTouched
  const hasNoError = (input: InputType) => !input.error
  const hasValue = (input: InputType) => input.value !== ''
  const inputValues = Object.values(inputs)
  const everyFiledIsValid = inputValues.every(hasNoError)
  const everyFiledHasBeenTouched = inputValues.every(hasBeenTouched)
  const everyFiledHasAValue = inputValues.every(hasValue)

  function shouldUpdateExpense() {
    if (!isEditScreen || !selectedExpense) return null

    if (
      Number(initialValues?.amount).toFixed(2) !==
        Number(inputs.amount.value.replace('$', '')).toFixed(2) ||
      initialValues?.date !== inputs.date.value ||
      initialValues?.description !== inputs.description.value.trim()
    ) {
      return true
    }

    return false
  }

  function shouldEnableButton() {
    if (isEditScreen) {
      return (
        ((everyFiledHasBeenTouched && everyFiledIsValid) ||
          everyFiledHasAValue) &&
        shouldUpdateExpense()
      )
    }

    return (
      (everyFiledHasBeenTouched && everyFiledIsValid) || everyFiledHasAValue
    )
  }

  useEffect(() => {
    if (shouldEnableButton()) {
      setIsSubmitButtonDisabled(false)
    } else {
      setIsSubmitButtonDisabled(true)
    }
  }, [inputs, initialValues])

  const handleSubmit = async () => {
    const expense = {
      amount: Number(inputs.amount.value.replace('$', '').replace(',', '')),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    await onSubmit(expense)
  }

  return (
    <View>
      <View style={styles.inputsContainer}>
        {Object.entries(inputs).map(([key, value]) => {
          if (key !== 'description') {
            return (
              <Input
                key={key}
                inputContainerStyles={styles.input}
                label={capitalize(key)}
                error={(value.hasBeenTouched && value.error) ?? ''}
                textInputProps={{
                  keyboardType: inputsConfig[key].keyboardType,
                  placeholder: inputsConfig[key].placeholder,
                  maxLength: inputsConfig[key].maxLength,
                  placeholderTextColor: globalStyles.colors.lightGrey,
                  onChangeText: value.handleChange,
                  value: value.value,
                  onBlur: value.handleBlur,
                }}
              />
            )
          }
          return null
        })}
      </View>

      <Input
        inputContainerStyles={styles.inputMultiline}
        label='Description'
        error={
          inputs.description.hasBeenTouched && inputs.description.error
            ? inputs.description.error
            : ''
        }
        textInputProps={{
          multiline: inputsConfig.description.multiline,
          placeholder: inputsConfig.description.placeholder,
          placeholderTextColor: globalStyles.colors.lightGrey,
          value: inputs.description.value,
          onChangeText: inputs.description.handleChange,
          onBlur: inputs.description.handleBlur,
        }}
      />

      <View style={styles.buttonsContainer}>
        <Button
          onPress={onCancel}
          rootStyles={styles.button}
          color={globalStyles.colors.coral}
        >
          Cancel
        </Button>
        <Button
          onPress={handleSubmit}
          rootStyles={styles.button}
          disabled={isSubmitButtonDisabled || isSubmitting}
          isLoading={isSubmitting}
        >
          {isEditScreen ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 16,
  },
  input: {
    width: '48%',
  },
  inputMultiline: {
    marginTop: 16,
    width: '90%',
    marginHorizontal: 'auto',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: 24,
  },
  button: {
    width: '48%',
  },
})
