import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'

const initialState = {}
const middleware =[thunkMiddleware]

const logger = createLogger(
    {
        diff: true
    }
)
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware, logger)
)
export default store