import { useState } from 'react'
import { isValidDate } from '../utils/validateDate'
import { InputValues, ExpenseformInitialValues } from '../types'

export function useExpenseformInputs(initialValues?: ExpenseformInitialValues) {
  const uSDollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  const requiredErrorText = 'this field is required'

  const [inputs, setInputs] = useState<InputValues>({
    amount: {
      hasBeenTouched: false,
      value: initialValues?.amount
        ? uSDollarFormatter.format(Number(initialValues.amount))
        : '',
      error: null,
    },
    date: {
      hasBeenTouched: false,
      value: initialValues?.date ?? '',
      error: null,
    },
    description: {
      hasBeenTouched: false,
      value: initialValues?.description ?? '',
      error: null,
    },
  })

  function handleAmountInputChange(text: string) {
    let formattedText = text.replace(',', '')

    if (formattedText.trim().length === 0) {
      setInputs((prevState) => ({
        ...prevState,
        amount: {
          ...prevState.amount,
          error: requiredErrorText,
          value: formattedText,
        },
      }))
      return
    }

    if (text.split('.').length > 2) {
      formattedText = text.split('.').slice(0, 2).join('.')
    }

    setInputs((prevState) => ({
      ...prevState,
      amount: {
        ...prevState.amount,
        value: formattedText,
        error: null,
      },
    }))
  }

  function handleAmountInputBlur() {
    if (inputs.amount.value.trim() === '') {
      setInputs((prevState) => ({
        ...prevState,
        amount: {
          ...prevState.amount,
          error: requiredErrorText,
        },
      }))
    }

    if (inputs.amount.value) {
      let valueToFormat = inputs.amount.value

      if (valueToFormat.includes('$')) {
        valueToFormat = valueToFormat.replace('$', '')
      }

      setInputs((prevState) => ({
        ...prevState,
        amount: {
          ...prevState.amount,
          value: uSDollarFormatter.format(Number(valueToFormat)),
          hasBeenTouched: true,
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      amount: {
        ...prevState.amount,
        hasBeenTouched: true,
      },
    }))
  }

  function handleDateInputChange(text: string) {
    const numericText = text.replace(/\D/g, '')

    let formattedDate = numericText

    if (numericText.length > 4) {
      formattedDate = `${numericText.slice(0, 4)}-${numericText.slice(4)}`
    }

    if (numericText.length > 6) {
      formattedDate = `${formattedDate.slice(0, 7)}-${numericText.slice(6, 8)}`
    }

    if (!isValidDate(formattedDate)) {
      setInputs((prevState) => ({
        ...prevState,
        date: {
          ...prevState.date,
          value: formattedDate,
          error: 'you must enter a valid date',
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      date: {
        ...prevState.date,
        value: formattedDate,
        ...(inputs.date.error && { error: null }),
      },
    }))
  }

  function handleDateInputBlur() {
    setInputs((prevState) => ({
      ...prevState,
      date: { ...prevState.date, hasBeenTouched: true },
    }))

    if (inputs.date.value.trim() === '') {
      setInputs((prevState) => ({
        ...prevState,
        date: { ...prevState.date, error: requiredErrorText },
      }))
    }
  }

  function handleDescriptionInputChange(text: string) {
    if (text.trim() === '') {
      setInputs((prevState) => ({
        ...prevState,
        description: {
          ...prevState.description,
          value: text,
          error: requiredErrorText,
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        value: text,
        ...(inputs.description.error && { error: null }),
      },
    }))
  }

  function handleDescriptionInputBlur() {
    setInputs((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        hasBeenTouched: true,
        error:
          inputs.description.value.trim() === ''
            ? requiredErrorText
            : prevState.description.error,
      },
    }))
  }

  return {
    amount: {
      value: inputs.amount.value,
      error: inputs.amount.error,
      hasBeenTouched: inputs.amount.hasBeenTouched,
      handleChange: handleAmountInputChange,
      handleBlur: handleAmountInputBlur,
    },
    date: {
      value: inputs.date.value,
      error: inputs.date.error,
      hasBeenTouched: inputs.date.hasBeenTouched,
      handleChange: handleDateInputChange,
      handleBlur: handleDateInputBlur,
    },
    description: {
      value: inputs.description.value,
      error: inputs.description.error,
      hasBeenTouched: inputs.description.hasBeenTouched,
      handleChange: handleDescriptionInputChange,
      handleBlur: handleDescriptionInputBlur,
    },
  }
}
