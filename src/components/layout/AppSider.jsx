import React, { useContext, useEffect, useState } from 'react'
import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import { fakeFetchCrypro, fetchAssets } from '../../api';
// import { Capitolize, percentDifference } from '../../utils'
import { Capitolize } from '../../utils'
import CryptoContext from '../../Context/CryptoContext';

const siderStyle = {
  padding: '1rem',
};

export default function AppSider() {
  // const [loading, setLoading] = useState(false)
  // const [crypto, setCrypto] = useState([])
  // const [assets, setAssets] = useState([])

  // useEffect(() => {
  //   async function preload() {
  //     setLoading(true)
  //     const { result } = await fakeFetchCrypro()
  //     const assets = await fetchAssets()

  //     setAssets(assets.map(asset => {
  //       const coin = result.find(c => c.id === asset.id)
  //       return {
  //         grow: asset.price < coin.price, // определение роста-падения монеты
  //         growPercent: percentDifference(asset.price, coin.price), //  процент роста-падения монеты
  //         totalAmount: asset.amount * coin.price,  // сумма в криптовалюте
  //         totalProfit: asset.amount * coin.price - asset.amount * asset.price, //  прибыль от инвестирования
  //         ...asset
  //       }
  //     }))
  //     setCrypto(result)
  //     setLoading(false)

  //     return true
  //   }
  //   preload()
  // }, [])
  const {loading, assets} = useContext(CryptoContext)



  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(asset => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={Capitolize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size='small'
            bordered
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
              // { title: 'Difference', value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>

                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent.toFixed(2)}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}

    </Layout.Sider>
  )
}
