import React, { createContext, useState, useEffect } from "react";
import { fakeFetchCrypro, fetchAssets } from "../api";
import { percentDifference } from '../utils'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypro()
            const assets = await fetchAssets()

            setAssets(assets.map(asset => {
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price, // определение роста-падения монеты
                    growPercent: percentDifference(asset.price, coin.price), //  процент роста-падения монеты
                    totalAmount: asset.amount * coin.price,  // сумма в криптовалюте
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price, //  прибыль от инвестирования
                    ...asset
                }
            }))
            setCrypto(result)
            setLoading(false)

            return true
        }
        preload()
    }, [])


    return (
        <CryptoContext.Provider value={{loading, crypto, assets}}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext