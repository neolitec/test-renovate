import type { ChartConfiguration, ChartType, DefaultDataPoint } from 'chart.js'
import Chart from 'chart.js/auto'
import { merge } from 'lodash-es'
import type { HTMLAttributes } from 'react'
import { useLayoutEffect, useRef } from 'react'

const DEFAULT_CONFIG = {
  options: {
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      xAxis: {
        grid: {
          tickColor: '#333',
          borderColor: '#333',
          color: '#333',
        },
      },
      yAxis: {
        grid: {
          tickColor: '#333',
          borderColor: '#333',
          color: '#333',
        },
      },
    },
  },
}

interface ChartContainerProps<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown,
> {
  config: ChartConfiguration<TType, TData, TLabel>
}

const ChartContainer = <
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown,
>({
  config,
  ...rest
}: ChartContainerProps<TType, TData, TLabel> &
  HTMLAttributes<HTMLCanvasElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart<TType, TData, TLabel>>()

  useLayoutEffect(() => {
    if (canvasRef.current) {
      chartInstance.current = new Chart(
        canvasRef.current,
        merge({}, DEFAULT_CONFIG, config),
      )
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [config])

  return <canvas {...rest} ref={canvasRef} />
}

export default ChartContainer
