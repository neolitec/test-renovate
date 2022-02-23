import type { GridValueFormatterParams } from '@mui/x-data-grid'
import { safeFormatAmount } from './number'

export const moneyValueFormatter = (params: GridValueFormatterParams) =>
  safeFormatAmount(params.value as number)
