import React, { useRef, useState } from 'react'
import { Select, Space, Typography, Flex, Divider, Form, Input, Button, InputNumber, DatePicker, Result } from 'antd'
import { useCrypto } from '../Context/CryptoContext'
import CoinInfo from './CoinInfo'

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} in not valid number'
    },
    number: {
        range: '${label} must be between ${max} and ${min}'
    }
}

export default function AddAssetForm({}) {
    const { crypto, addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [form] = Form.useForm()
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console">
                        Close
                    </Button>
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select coin"
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                    </Space>
                )}
            />
        )
    }

    function onFinish(value) {
        console.log(value)
        const newAsset = {
            id: coin.id,
            amount: value.amount,
            price: value.price,
            date: value.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        // console.log('finish', value)
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2),

            }}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
        >

            <CoinInfo coin={coin}/>
            {/* <Flex align='ceneter'>
                <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
                <Typography.Title level={2} style={{ margin: 0 }}>
                    ({coin.symbol}) {coin.name}
                </Typography.Title>
            </Flex> */}
            {/* <Typography.Title level={2} style={{ margin: '2rem' }}>
                {coin.name}
            </Typography.Title> */}
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber placeholder='Enter coin mount' onChange={handleAmountChange} />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            >
                <InputNumber style={{ width: '100%' }} onChange={handlePriceChange} />
            </Form.Item>

            <Form.Item
                label="Date & Time"
                name="date"
            >
                <DatePicker showTime />
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}
