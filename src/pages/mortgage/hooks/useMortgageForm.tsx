import { useEffect, useMemo, useState } from 'react'
import Mortgage, { PaymentFrequency } from '../model/Mortgage'

const DEFAULT_FORM_DATA: MorgageFormData = {
  name: '',
  amount: null,
  interestRate: null,
  amortization: 25,
  paymentFrequency: PaymentFrequency.Monthly,
}

interface MorgageFormData {
  name: string
  amount: number | null
  interestRate: number | null
  amortization: number
  paymentFrequency: PaymentFrequency
}

interface FormController<T extends object> {
  state: T
  setState: (newValues: Partial<T>) => void
  isFormComplete: boolean
  mortgage?: Mortgage
}

const useMortgageForm = (): FormController<MorgageFormData> => {
  const [state, setState] = useState<MorgageFormData>(DEFAULT_FORM_DATA)
  const [mortgage, setMortgage] = useState<Mortgage | undefined>()

  const isFormComplete = useMemo(
    () =>
      !!(
        state.name &&
        state.amount &&
        (state.interestRate || state.interestRate === 0) &&
        state.amortization
      ),
    [state.amortization, state.amount, state.interestRate, state.name],
  )

  useEffect(() => {
    if (isFormComplete) {
      setMortgage(
        new Mortgage({
          name: state.name,
          amount: state.amount || 0,
          interestRate: state.interestRate || 0,
          amortization: state.amortization || 0,
          paymentFrequency: state.paymentFrequency,
        }),
      )
    }
  }, [
    isFormComplete,
    state.amortization,
    state.amount,
    state.interestRate,
    state.name,
    state.paymentFrequency,
  ])

  return {
    state,
    setState: (newValues) => {
      setState((prevState) => ({
        ...prevState,
        ...newValues,
      }))
    },
    isFormComplete,
    mortgage,
  }
}

export default useMortgageForm
