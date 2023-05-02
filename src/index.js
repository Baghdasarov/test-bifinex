import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import createSagaMiddleWare from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from 'store/app/app.reducer'
import { appSaga } from 'store/app/app.saga'

const sagaMiddleware = createSagaMiddleWare()

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(appSaga)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
