import { DropdownOption, HistoricalDataType } from './types'

export const GROUP_SIZE_DROPDOWN_OPTIONS: DropdownOption[] = [
  {
    key: '0.5',
    text: 'Group 0.5',
    value: 0.5
  },
  {
    key: '1',
    text: 'Group 1',
    value: 1
  },
  {
    key: '2.5',
    text: 'Group 2.5',
    value: 2.5
  }
]

export const HISTORICAL_TYPE_DROPDOWN_OPTIONS: DropdownOption[] = [
  {
    key: HistoricalDataType.MINUTE,
    text: 'Daily',
    value: HistoricalDataType.MINUTE
  },
  {
    key: HistoricalDataType.HOUR,
    text: 'Hour',
    value: HistoricalDataType.HOUR
  },
  {
    key: HistoricalDataType.DAILY,
    text: 'Daily',
    value: HistoricalDataType.DAILY
  }
]
