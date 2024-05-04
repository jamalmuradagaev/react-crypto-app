export const percentDifference = (a, b) => {
    return +(100 * Math.abs((a - b) / ((a + b) / 2)))
}

export const Capitolize = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1)
}