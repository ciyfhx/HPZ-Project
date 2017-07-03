
const initState = {
  bookings: ""
}

export default (state = initState, action) =>{
  switch(action.type){
    case "SET_BOOKINGS":
       return { ...state, bookings:action.bookings}
    default: return state;
  }
}
