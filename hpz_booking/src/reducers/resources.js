
const initState = {
  resources: "",
  resourceBookings: []
}

export default (state = initState, action) =>{
  switch(action.type){
    case "SET_RESOURCES":
       return { ...state, resources:action.resources}
    case "SET_RESOURCE_BOOKINGS":
       return { ...state, resourceBookings:action.resourceBookings}
    default: return state;
  }
}
