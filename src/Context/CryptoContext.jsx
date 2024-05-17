import React, { createContext, useState, useEffect, useContext } from "react";
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

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price, // определение роста-падения монеты
                growPercent: percentDifference(asset.price, coin.price), //  процент роста-падения монеты
                totalAmount: asset.amount * coin.price,  // сумма в криптовалюте
                totalProfit: asset.amount * coin.price - asset.amount * asset.price, //  прибыль от инвестирования
                name: coin.name,
                ...asset
            }
        }
        )
    }

useEffect(() => {
    async function preload() {
        setLoading(true)
        const { result } = await fakeFetchCrypro()
        const assets = await fetchAssets()

        setAssets(mapAssets(assets, result))
        setCrypto(result)
        setLoading(false)

        return true
    }
    preload()
}, [])

function addAsset(newAsset) {
    setAssets(prev => mapAssets([...prev, newAsset], crypto))
}


return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
        {children}
    </CryptoContext.Provider>
)
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext);
}