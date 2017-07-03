
import isEmpty from 'lodash/isEmpty';


const initState = {
  isAuthenticated: false,
  user: {}
}

export default (state=initState, action = {}) =>{
  switch(action.type){
    case "SET_USER":
       return { ...state, isAuthenticated: !state.isAuthenticated, user: action.user}
    default: return state;
  }
}
