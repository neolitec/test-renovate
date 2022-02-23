import TableRowsIcon from '@mui/icons-material/TableRows'
import { Container } from '@mui/material'
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'
import type { ComponentProps } from 'react'

const DataGrid: React.FC<ComponentProps<typeof MuiDataGrid>> = ({
  rows,
  ...rest
}) => {
  if (rows.length === 0) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: (t) => t.spacing(4),
        }}
      >
        <TableRowsIcon />
        <span>No data</span>
      </Container>
    )
  }

  return <MuiDataGrid rows={rows} {...rest} />
}

export default DataGrid
