export const parseAmount = (amount) => {
  const roundedVal = Math.floor(amount * 100000) / 100000

  if (roundedVal >= 100) {
    return roundedVal.toFixed(1)
  }

  if (roundedVal >= 10) {
    return roundedVal.toFixed(2)
  }

  if (roundedVal >= 1) {
    return roundedVal.toFixed(3)
  }

  return roundedVal.toFixed(4)
}
