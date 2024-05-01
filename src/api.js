// данные будут браться из файла data.js - альтернатива запросу на сервер
import { cryptoAssets, cryptoData } from './data'

// export function fakeFetchCrypro() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(cryptoData)
//         }, 1);
//     })
// }

// export function fetchAssets() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(cryptoAssets)
//         }, 1);
//     })
// }

// данные будут браться из сервера
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-API-KEY': 'ANUsWdeKo3MTEz4wXBPoEjcTuH4B/E0GHkgCuaP+orI='
    }
};

export async function fakeFetchCrypro() {
    const data = await fetch('https://openapiv1.coinstats.app/coins', options)
    const result = await data.json()
    return result

}

export async function fetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1);
    })
}