import { CircularProgress } from '@mui/material'
import type { GridColumns, GridValueFormatterParams } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { safeFormatAmount } from '../../../../lib/number'
import type Mortgage from '../../model/Mortgage'
import type { AmortizationTableRow } from '../../model/Mortgage'

const moneyValueFormatter = (params: GridValueFormatterParams) =>
  safeFormatAmount(params.value as number)

const columns: GridColumns = [
  { field: 'paymentNumber', headerName: 'Payment #', width: 150 },
  {
    field: 'principal',
    headerName: 'Principal',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
  {
    field: 'principalAcc',
    headerName: 'Principal Cumul',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
  {
    field: 'interest',
    headerName: 'Interest',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
  {
    field: 'interestAcc',
    headerName: 'Interest Cumul',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
  {
    field: 'paid',
    headerName: 'Payment',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
  {
    field: 'paidAcc',
    headerName: 'Payment Cumul',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
  {
    field: 'balance',
    headerName: 'Balance',
    flex: 1,
    valueFormatter: moneyValueFormatter,
  },
]

interface AmortizationGridProps {
  mortgage: Mortgage
}

const AmortizationGrid = ({ mortgage }: AmortizationGridProps) => {
  const [amortizationData, setAmortizationData] =
    useState<AmortizationTableRow[]>()

  useEffect(() => {
    if (mortgage) {
      setAmortizationData(mortgage.getAmortizationTable({ perYear: false }))
    }
  }, [mortgage])

  if (!amortizationData) {
    return <CircularProgress sx={{ mx: 'auto ' }} />
  }

  return (
    <DataGrid
      sx={{
        maxHeight: 600,
        height: '100%',
      }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            principalAcc: false,
            interestAcc: false,
            paidAcc: false,
          },
        },
      }}
      rows={amortizationData}
      columns={columns}
      getRowId={(row) => row.paymentNumber}
    />
  )
}

export default AmortizationGrid
