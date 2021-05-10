import { combineReducers } from 'redux' 
import clientR from './clientR'
import creditR from './creditR'
import debitR from './debitR'
import rateR from './rateR'
import SbdR from './searchByDateReducer'
import CBReducer from './CBReducer'
import authR from './authReducer'

const RootReducer  = combineReducers({
    clientR,
    creditR,
    debitR,
    rateR,
    SbdR,
    CBReducer,
    authR,
})

export default RootReducer 