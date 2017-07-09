import axios from 'axios';

export function setResources(data){
  return {
    type: "SET_RESOURCES",
    resources: data
  }
}

export function setResourceBookings(data){
  return {
    type: "SET_RESOURCE_BOOKINGS",
    resourceBookings: data
  }
}

export default function getResources(){
  return (dispatch) => {
    return axios.get('api/resources').then(res => {
      dispatch(setResources(res.data.result))
    });
  }
}

export function getResourceBookings(id){
  return (dispatch) => {
    return axios.get('api/resource-bookings/'+id).then(res => {
      dispatch(setResourceBookings(res.data.result))
    });
  }
}
