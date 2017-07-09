
const initState = {
  bookings: [],
  resources: []
}

export default (state = initState, action) =>{
  switch(action.type){
    case "SET_BOOKINGS":
       return { ...state, bookings:action.bookings}
    case "UPDATE_RESOURCES":
       return { ...state, resources:action.resources}
    default: return state;
  }
}
