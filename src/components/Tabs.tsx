import type { SxProps, Theme } from '@mui/material'
import { Box, Tab, Tabs as MuiTabs } from '@mui/material'
import type { HTMLAttributes } from 'react'
import { useState } from 'react'

interface TabData {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabData: TabData[]
  sx?: SxProps<Theme>
  'aria-label'?: string
}

const Tabs = ({ tabData, sx, 'aria-label': ariaLabel }: TabsProps) => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label={ariaLabel}>
          {tabData.map((tab, index) => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </Box>
      {tabData.map((tab, index) => (
        <TabPanel
          value={value}
          index={index}
          key={tab.label}
          style={{ flex: '1', height: '100%' }}
        >
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  )
}

export default Tabs

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps & HTMLAttributes<HTMLDivElement>) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: (t) => t.spacing(2), flex: 1, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  )
}
