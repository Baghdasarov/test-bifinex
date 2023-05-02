import { API_URL } from 'api'
import { Icons } from 'assets/icons'
import { OrderBookRow } from 'components/OrderBookRow'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DECREMENT_PRECISION, INCREMENT_PRECISION, SUBSCRIBED } from 'store/orderBook/types'
import { updateOrderBook } from 'utils/helpers/updateOrderBook'

const w = new WebSocket(API_URL)

const conf = JSON.stringify({ event: 'conf', flags: 536870912 })

const subscribe = {
  symbol: 'tBTCUSD',
  prec: 'P0',
  freq: 'F0',
  len: '100',
  event: 'subscribe',
  channel: 'book',
}

export const OrderBookWidget = () => {
  const chanId = useSelector((state) => state.orderBook.chanId)
  const precision = useSelector((state) => state.orderBook.precision)

  const [orderBook, setOrderBook] = useState({
    bids: [],
    asks: [],
  })
  const [isInitial, setIsInitial] = useState(true)

  const dispatch = useDispatch()

  const unsubscribe = (chanId) => {
    const msg = JSON.stringify({
      event: 'unsubscribe',
      chanId,
    })

    w.send(msg)
  }

  const incrementPrecision = () => {
    if (precision > 0) {
      dispatch({ type: DECREMENT_PRECISION })
      setOrderBook({
        bids: [],
        asks: [],
      })
    }
  }

  const decrementPrecision = () => {
    if (precision < 4) {
      dispatch({ type: INCREMENT_PRECISION })
      setOrderBook({
        bids: [],
        asks: [],
      })
    }
  }

  const resubscribe = (precision) => {
    w.send(JSON.stringify({ ...subscribe, prec: `P${precision}` }))
  }

  useEffect(() => {
    w.onopen = () => {
      w.send(conf)
      w.send(JSON.stringify({ ...subscribe, prec: `P${precision}` }))
    }

    w.onmessage = (e) => {
      const event = JSON.parse(e.data)

      if (event?.event === 'subscribed' && event?.chanId) {
        dispatch({ type: SUBSCRIBED, payload: event.chanId })
      }

      if (Array.isArray(event) && event.length > 1) {
        const [_, data] = event

        if (Array.isArray(data)) {
          updateOrderBook(data, setOrderBook)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!isInitial) {
      unsubscribe(chanId)
      resubscribe(precision)
    } else {
      setIsInitial(false)
    }
  }, [precision])

  return (
    <div className='widget-container'>
      <div className='header'>
        <div className='widget-name'>
          ORDER BOOK <span className='currency'>BTC/USD</span>
        </div>
        <div className='settings'>
          <span
            onClick={decrementPrecision}
            className='setting-button'
            title='Decrease Precision'
          >
            <Icons.DecreasePrecision />
          </span>
          <span
            onClick={incrementPrecision}
            className='setting-button'
            title='Increase Precision'
          >
            <Icons.IncreasePrecision />
          </span>
        </div>
      </div>
      <div className='tables-container'>
        <div className='table bids'>
          <div className='row title-row'>
            <div className='col count'>count</div>
            <div className='col amount'>amount</div>
            <div className='col total'>total</div>
            <div className='col price'>price</div>
          </div>
          {orderBook.bids.slice(0, 24).map((level, index) => (
            <OrderBookRow
              orders={orderBook.bids.slice(0, 24)}
              amount={level.amount}
              count={level.count}
              price={level.price}
              total={level.total}
              width={level.width}
              type='bids'
              key={`bidsRow${index}`}
            />
          ))}
        </div>
        <div className='table asks'>
          <div className='row title-row'>
            <div className='col price'>price</div>
            <div className='col total'>total</div>
            <div className='col amount'>amount</div>
            <div className='col count'>count</div>
          </div>
          {orderBook.asks.slice(0, 24).map((level, index) => (
            <OrderBookRow
              orders={orderBook.asks.slice(0, 24)}
              amount={level.amount}
              count={level.count}
              price={level.price}
              total={level.total}
              width={level.width}
              type='asks'
              key={`asksRow${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
