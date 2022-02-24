import { chunk, sumBy } from 'lodash-es'
import { nanoid } from 'nanoid/non-secure'

export enum PaymentFrequency {
  Monthly = 'monthly',
  Weekly = 'weekly',
  BiWeekly = 'biweekly',
}

export const PaymentsPerYear: Record<PaymentFrequency, number> = {
  [PaymentFrequency.Monthly]: 12,
  // [PaymentFrequency.Weekly]: (365 * 4 + 1) / 4 / 7,
  [PaymentFrequency.Weekly]: 52,
  [PaymentFrequency.BiWeekly]: 26,
}

export interface IMortgage {
  /**
   * Technical id of a mortgage
   */
  id: string
  /**
   * The name of the calculation/simulation
   */
  name: string
  /**
   * The loan amount
   */
  amount: number
  /**
   * Interest rate in percentage
   */
  interestRate: number
  /**
   * Amortization is the number of payments over the life of the loan.
   */
  amortization: number
  /**
   * Payment frequency
   */
  paymentFrequency: PaymentFrequency
}

export interface AmortizationTableRow {
  paymentNumber: number | string
  interest: number
  interestAcc: number
  principal: number
  principalAcc: number
  paid: number
  paidAcc: number
  balance: number
}

class Mortgage implements IMortgage {
  readonly id: string

  private _name = ''

  readonly amount: number

  readonly interestRate: number

  readonly amortization: number

  readonly paymentFrequency: PaymentFrequency = PaymentFrequency.Monthly

  constructor({
    id,
    name,
    amount,
    interestRate,
    amortization,
    paymentFrequency,
  }: Omit<IMortgage, 'id'> & { id?: string }) {
    this.id = id || nanoid()
    this.name = name
    this.amount = amount
    this.interestRate = interestRate
    this.amortization = amortization
    this.paymentFrequency = paymentFrequency
  }

  set name(name: string) {
    // eslint-disable-next-line no-underscore-dangle
    this._name = name
  }

  get name(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._name
  }

  getPayment(): number {
    const totalPaymentCount = this.getTotalPaymentCount()
    const subdividedInterestRate =
      this.interestRate / 100 / this.getPaymentCountPerYear()
    const top =
      subdividedInterestRate * (1 + subdividedInterestRate) ** totalPaymentCount
    const bottom = (1 + subdividedInterestRate) ** totalPaymentCount - 1
    return this.amount * (top / bottom)
  }

  getTotalPaymentCount(): number {
    return PaymentsPerYear[this.paymentFrequency] * this.amortization
  }

  getPaymentCountPerYear(): number {
    return PaymentsPerYear[this.paymentFrequency]
  }

  getTotalPayment(): number {
    const monthlyPayment = this.getPayment()
    return monthlyPayment * this.getTotalPaymentCount()
  }

  getTotalInterest(): number {
    const totalPayment = this.getTotalPayment()
    const totalInterest = totalPayment - this.amount
    return totalInterest
  }

  getAmortizationTable(
    { perYear } = { perYear: true },
  ): AmortizationTableRow[] {
    const table: AmortizationTableRow[] = []

    const initialRow = {
      paymentNumber: 0,
      interest: 0,
      interestAcc: 0,
      principal: 0,
      principalAcc: 0,
      paid: 0,
      paidAcc: 0,
      balance: this.amount,
    }

    const amortizationTablePerPayment = this.getAmortizationTablePerPayment()

    if (perYear) {
      const perYearAmortizationTable = chunk(
        amortizationTablePerPayment,
        this.getPaymentCountPerYear(),
      ).reduce(
        (acc, yearPayments, index) => {
          const interest = sumBy(yearPayments, 'interest')
          const principal = sumBy(yearPayments, 'principal')

          return [
            ...acc,
            {
              paymentNumber: index + 1,
              interest,
              interestAcc: interest + acc[acc.length - 1].interestAcc,
              principal,
              principalAcc: principal + acc[acc.length - 1].principalAcc,
              paid: interest + principal,
              paidAcc: interest + principal + acc[acc.length - 1].paidAcc,
              balance: yearPayments[yearPayments.length - 1].balance,
            },
          ]
        },
        [initialRow],
      )
      table.push(...perYearAmortizationTable)
    } else {
      table.push(initialRow, ...amortizationTablePerPayment)
    }

    return table
  }

  private getAmortizationTablePerPayment(): AmortizationTableRow[] {
    const table: AmortizationTableRow[] = []

    let prevBalance = this.amount
    let prevInterest = 0
    let prevPrincipal = 0
    for (let i = 0; i < this.getTotalPaymentCount(); i += 1) {
      const interest =
        (prevBalance * this.interestRate) / 100 / this.getPaymentCountPerYear()
      const principal = this.getPayment() - interest
      const balance = prevBalance - principal
      table.push({
        paymentNumber: i + 1,
        interest,
        interestAcc: prevInterest + interest,
        principal,
        principalAcc: prevPrincipal + principal,
        paid: interest + principal,
        paidAcc: prevInterest + interest + prevPrincipal + principal,
        balance: prevBalance - principal,
      })
      prevBalance = balance
      prevInterest = interest
      prevPrincipal = principal
    }

    return table
  }
}

export default Mortgage
