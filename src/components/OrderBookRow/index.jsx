import { useEffect, useRef, useState } from 'react'
import { parseAmount } from 'utils/helpers/parseAmount'
import { parsePrice } from 'utils/helpers/parsePrice'

export const OrderBookRow = ({
  width,
  count,
  amount,
  total,
  price,
  type = 'bids',
  orders = [],
}) => {
  const [prevOrders, setPrevOrders] = useState(orders)
  const rowRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    setPrevOrders(orders)
  }, [orders])

  const shouldBlink = !prevOrders.some((item) => item.price === price)

  if (shouldBlink && rowRef.current) {
    rowRef.current?.classList.add('blink')
    barRef.current?.classList.add('blink')

    setTimeout(() => {
      rowRef.current?.classList.remove('blink')
      barRef.current?.classList.remove('blink')
    }, 300)
  }

  if (type === 'asks') {
    return (
      <div ref={rowRef} className='row'>
        <div
          ref={barRef}
          className='bar'
          style={{
            width: width + 'px',
          }}
        />
        <div className='col price'>{parsePrice(price)}</div>
        <div className='col total'>{parseAmount(total)}</div>
        <div className='col amount'>{parseAmount(Math.abs(amount))}</div>
        <div className='col count'>{count}</div>
      </div>
    )
  }

  return (
    <div ref={rowRef} className='row'>
      <div
        ref={barRef}
        className='bar'
        style={{
          width: width + 'px',
        }}
      />
      <div className='col count'>{count}</div>
      <div className='col amount'>{parseAmount(amount)}</div>
      <div className='col total'>{parseAmount(total)}</div>
      <div className='col price'>{parsePrice(price)}</div>
    </div>
  )
}
