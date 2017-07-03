import {combineReducers} from 'redux'

import auth from './auth'
import bookings from './bookings'
import resources from './resources'

export default combineReducers({auth, bookings, resources});
