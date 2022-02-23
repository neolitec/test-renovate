import type { GridColumns } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import DataGrid from '../../../components/DataGrid/DataGrid'
import { moneyValueFormatter } from '../../../lib/grid'
import type Mortgage from '../model/Mortgage'
import DeleteMortgageButton from './DeleteMortgageButton'

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    filterable: false,
    sortable: true,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    valueFormatter: moneyValueFormatter,
    filterable: false,
    sortable: true,
  },
  {
    field: 'interestRate',
    headerName: 'Interest',
    width: 150,
    filterable: false,
    sortable: true,
  },
  {
    field: 'amortization',
    headerName: 'Payments',
    width: 150,
    filterable: false,
    sortable: true,
  },
  {
    field: 'id',
    type: 'actions',
    getActions: ({ row: mortgage }) => [
      <DeleteMortgageButton
        key="delete"
        mortgage={mortgage as any as Mortgage}
      />,
    ],
  },
]

interface MortgagesTableProps {
  mortgages: Mortgage[]
}

const MortgagesTable = ({ mortgages }: MortgagesTableProps) => {
  const navigate = useNavigate()

  return (
    <DataGrid
      sx={{
        maxHeight: 600,
        flex: 1,
      }}
      rows={mortgages}
      columns={columns}
      getRowId={(row) => row.id}
      onRowClick={(row) => {
        navigate(`/mortgage/view/${row.id}`)
      }}
    />
  )
}

export default MortgagesTable
