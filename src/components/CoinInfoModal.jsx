import React from 'react'
import { Flex, Tag, Typography, Divider } from "antd"
import { Capitolize } from '../utils'



export default function CoinInfoModal({ coin }) {

  return (<>
    <Flex align='ceneter'>
      <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        ({coin.symbol}) {coin.name}
      </Typography.Title>
    </Flex>

    <Divider />

    <Typography.Paragraph>
      <Typography.Text strong>1 hour: </Typography.Text>
      <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>

      <Typography.Text strong>1 day: </Typography.Text>
      <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>

      <Typography.Text strong>1 week: </Typography.Text>
      <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>Price: </Typography.Text>
      {coin.price.toFixed(2)}$
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>Price BTC: </Typography.Text>
      {coin.priceBtc}
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>Market Cap: </Typography.Text>
      {coin.marketCap}$
    </Typography.Paragraph>

    <Typography.Paragraph>
      <Typography.Text strong>Contract Address: </Typography.Text>
      {coin.contractAddress}
    </Typography.Paragraph>
  </>
  )
}
