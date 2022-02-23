import type { AmortizationTableRow } from './Mortgage'
import Mortgage, { PaymentFrequency } from './Mortgage'

const A_MORTGAGE = new Mortgage({
  name: 'Mortgage name',
  amount: 288000,
  interestRate: 1.6,
  amortization: 25,
  paymentFrequency: PaymentFrequency.Monthly,
})

const A_WEEKLY_MORTGAGE = new Mortgage({
  name: 'Mortgage name',
  amount: 288000,
  interestRate: 1.6,
  amortization: 25,
  paymentFrequency: PaymentFrequency.Weekly,
})

const A_BIWEEKLY_MORTGAGE = new Mortgage({
  name: 'Mortgage name',
  amount: 288000,
  interestRate: 1.6,
  amortization: 25,
  paymentFrequency: PaymentFrequency.BiWeekly,
})

describe(Mortgage, () => {
  describe('when payment frequency is monthly', () => {
    describe(Mortgage.prototype.getPaymentCountPerYear, () => {
      it('should calculate the number of payments per year', () => {
        const monthlyPayment = A_MORTGAGE.getPaymentCountPerYear()

        expect(monthlyPayment).toEqual(12)
      })
    })

    describe(Mortgage.prototype.getTotalPaymentCount, () => {
      it('should calculate the total number of payments', () => {
        const monthlyPayment = A_MORTGAGE.getTotalPaymentCount()

        expect(monthlyPayment).toEqual(300)
      })
    })

    describe(Mortgage.prototype.getPayment, () => {
      it('should calculate monthly payment', () => {
        const monthlyPayment = A_MORTGAGE.getPayment()

        expect(monthlyPayment).toBeCloseTo(1165.4, 2)
      })
    })

    describe(Mortgage.prototype.getTotalPayment, () => {
      it('should calculate total payment', () => {
        const totalPayment = A_MORTGAGE.getTotalPayment()

        expect(totalPayment).toBeCloseTo(349619.22, 2)
      })
    })

    describe(Mortgage.prototype.getTotalInterest, () => {
      it('should calculate total interest', () => {
        const totalInterest = A_MORTGAGE.getTotalInterest()

        expect(totalInterest).toBeCloseTo(61619.22, 2)
      })
    })

    describe(Mortgage.prototype.getAmortizationTable, () => {
      let amortizationTable: AmortizationTableRow[]

      beforeEach(() => {
        amortizationTable = A_MORTGAGE.getAmortizationTable()
      })

      it('should calculate amortization table', () => {
        expect(amortizationTable).toMatchSnapshot()
      })

      it('should have last element with a null balance', () => {
        const lastElement = amortizationTable[amortizationTable.length - 1]

        expect(lastElement.balance).toBeCloseTo(0, 2)
      })
    })
  })

  describe('when payment frequency is weekly', () => {
    describe(Mortgage.prototype.getPayment, () => {
      it('should calculate monthly payment', () => {
        const monthlyPayment = A_WEEKLY_MORTGAGE.getPayment()

        expect(monthlyPayment).toBeCloseTo(268.09, 2)
      })
    })

    describe(Mortgage.prototype.getTotalPayment, () => {
      it('should calculate total payment', () => {
        const totalPayment = A_WEEKLY_MORTGAGE.getTotalPayment()

        expect(totalPayment).toBeCloseTo(349473.4, 2)
      })
    })

    describe(Mortgage.prototype.getTotalInterest, () => {
      it('should calculate total interest', () => {
        const totalInterest = A_WEEKLY_MORTGAGE.getTotalInterest()

        expect(totalInterest).toBeCloseTo(61473.4, 2)
      })
    })
  })

  describe('when payment frequency is bi-weekly', () => {
    describe(Mortgage.prototype.getPayment, () => {
      it('should calculate monthly payment', () => {
        const monthlyPayment = A_BIWEEKLY_MORTGAGE.getPayment()

        expect(monthlyPayment).toBeCloseTo(536.25, 2)
      })
    })

    describe(Mortgage.prototype.getTotalPayment, () => {
      it('should calculate total payment', () => {
        const totalPayment = A_BIWEEKLY_MORTGAGE.getTotalPayment()

        expect(totalPayment).toBeCloseTo(349516.99, 2)
      })
    })

    describe(Mortgage.prototype.getTotalInterest, () => {
      it('should calculate total interest', () => {
        const totalInterest = A_BIWEEKLY_MORTGAGE.getTotalInterest()

        expect(totalInterest).toBeCloseTo(61516.99, 2)
      })
    })
  })
})
