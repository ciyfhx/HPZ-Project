
const initState = {
  bookings: [],
  selectedResources: []
}

export default (state = initState, action) =>{
  switch(action.type){
    case "SET_BOOKINGS":
       return { ...state, bookings:action.bookings}
    case "UPDATE_SELECTED_RESOURCES":
       return { ...state, selectedResources:action.selectedResources}
    default: return state;
  }
}
