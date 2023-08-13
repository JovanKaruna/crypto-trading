import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import { type MarketTableData } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import { formatRupiah, isMinus } from '../utils/utils'

interface TableProps {
  data: MarketTableData[]
}

const MarketTable = ({ data }: TableProps): JSX.Element => {
  const createPercentage = (number: string): JSX.Element => {
    const minus = isMinus(number)
    return (
      <div className={minus ? 'text-red-error' : 'text-green'}>
        <i
          className={`${
            minus ? 'red-error caret down' : 'green caret up'
          } icon`}
        />
        {minus ? number.substring(1) : number}%
      </div>
    )
  }

  return (
    <Segment className="overflow-x-scroll lg:overflow-x-visible" basic>
      <Table className="min-w-90vh" padded="very" compact unstackable>
        <Table.Header>
          <Table.Row className="h-20 text-xl font-bold">
            <Table.HeaderCell>
              <div className="ml-20">CRYPTO</div>
            </Table.HeaderCell>
            <Table.HeaderCell>HARGA</Table.HeaderCell>
            <Table.HeaderCell>24 JAM</Table.HeaderCell>
            <Table.HeaderCell>1 MGG</Table.HeaderCell>
            <Table.HeaderCell>1 BLN</Table.HeaderCell>
            <Table.HeaderCell>1 THN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length > 0 ? (
            data.map((value, index) => {
              return (
                <Table.Row
                  className="h-20 text-base md:text-lg font-bold"
                  key={index}
                >
                  <Table.Cell className="hover:cursor-pointer">
                    <Link href="/exchange">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-10">
                          <Image
                            src={value.logo}
                            alt={value.logo}
                            width={25}
                            height={25}
                          />
                          <div>{value.name}</div>
                        </div>
                        <div className="flex items-center">
                          {value.currencySymbol}
                        </div>
                      </div>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-lg font-bold">
                    {formatRupiah(value.latestPrice)}
                  </Table.Cell>
                  <Table.Cell>{createPercentage(value.day)}</Table.Cell>
                  <Table.Cell>{createPercentage(value.week)}</Table.Cell>
                  <Table.Cell>{createPercentage(value.month)}</Table.Cell>
                  <Table.Cell>{createPercentage(value.year)}</Table.Cell>
                </Table.Row>
              )
            })
          ) : (
            <Table.Row>
              <Table.Cell>No Data Found</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default MarketTable
