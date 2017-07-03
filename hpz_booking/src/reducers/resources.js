
const initState = {
  resources: ""
}

export default (state = initState, action) =>{
  switch(action.type){
    case "SET_RESOURCES":
       return { ...state, resources:action.resources}
    default: return state;
  }
}
