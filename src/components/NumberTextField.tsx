import type { TextFieldProps } from '@mui/material'
import { TextField } from '@mui/material'
import type { InputHTMLAttributes } from 'react'
import React, { forwardRef, useMemo } from 'react'
import type { NumberFormatProps } from 'react-number-format'
import NumberFormat from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const generateNumberFormatComponent = (
  numberFormatProps: NumberFormatProps = {},
) =>
  React.forwardRef<
    NumberFormat<InputHTMLAttributes<HTMLInputElement>>,
    CustomProps
  >((props, ref) => {
    const { onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: `${values.floatValue}`,
            },
          })
        }}
        thousandsGroupStyle="thousand"
        decimalSeparator="."
        displayType="input"
        type="text"
        thousandSeparator
        allowNegative
        {...numberFormatProps}
      />
    )
  })

interface NumberTextFieldBaseProps {
  onChange?: (value: number | null) => void
  value?: number | null
  NumberFormatProps?: NumberFormatProps
}

type NumberTextFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> &
  NumberTextFieldBaseProps

const NumberTextField = forwardRef<HTMLInputElement, NumberTextFieldProps>(
  ({ onChange, value, InputProps, NumberFormatProps, ...rest }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const numberValue = parseFloat(event.target.value)
      onChange?.(!Number.isNaN(numberValue) ? numberValue : null)
    }

    const NumberFormatComponent = useMemo(
      () => generateNumberFormatComponent(NumberFormatProps),
      [NumberFormatProps],
    )

    return (
      <TextField
        ref={ref}
        value={!value && value !== 0 ? '' : value}
        onChange={handleChange}
        InputProps={{
          ...InputProps,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumberFormatComponent as any,
        }}
        {...rest}
      />
    )
  },
)

export default NumberTextField
