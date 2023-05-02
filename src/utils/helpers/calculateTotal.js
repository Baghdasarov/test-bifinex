export const calculateTotal = (book) => {
  let total = 0
  return book.map((level) => {
    total += Math.abs(level.amount)
    return { ...level, total }
  })
}
