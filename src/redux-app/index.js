import { createStore, compose, applyMiddleware } from 'redux'
import { permanent } from './middlewares/permanent'
import { rootReducer } from './modules';
import { getSavedState } from './utils/storage'

const create = () => {
  let composeEnhancers = compose
  const middleware = [
    permanent,
  ]

   if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

  return createStore(
    rootReducer(),
    getSavedState(),
    composeEnhancers(
      applyMiddleware(...middleware),
    )
  )
}

export const store = create();
