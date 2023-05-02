import { calculateTotal } from 'utils/helpers/calculateTotal'

export const updateOrderBook = (arr, setOrderBook) => {
  setOrderBook((prev) => {
    let newValue = { ...prev }

    arr.forEach((data) => {
      const [price, count, amount] = data
      const side = amount > 0 ? 'bids' : 'asks'

      const updatedBook = { ...newValue }
      const index = updatedBook[side].findIndex(
        (level) => level.price === price
      )

      if (index > -1) {
        updatedBook[side][index].count = count
        updatedBook[side][index].amount = amount
      } else {
        updatedBook[side].push({ price, count, amount })
      }

      updatedBook[side] = calculateTotal(
        updatedBook[side]
          .filter((item) => item.count !== 0)
          .sort((a, b) =>
            side === 'bids' ? b.price - a.price : a.price - b.price
          )
      )

      if (updatedBook[side].length >= 24) {
        const maxTotal = Math.max(
          ...updatedBook['bids'].slice(0, 26).map((d) => d.total),
          ...updatedBook['asks'].slice(0, 26).map((d) => d.total)
        )

        updatedBook[side] = updatedBook[side].map((item, index) => {
          const range = Math.abs(item?.price - updatedBook[side][0]?.price)

          let width = (item.total / maxTotal) * 300

          if (index !== 0) {
            width *=
              (updatedBook[side].length + range - index) /
              updatedBook[side].length
          }

          return {
            ...item,
            width,
          }
        })
      }

      newValue = updatedBook
    })

    return newValue
  })
}
