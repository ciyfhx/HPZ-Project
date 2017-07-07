import axios from 'axios';

export function setBookings(data){
  return {
    type: "SET_BOOKINGS",
    bookings: data
  }
}

export default function getBookings(){
  return (dispatch) => {
    return axios.get('api/bookings').then(res => {
      dispatch(setBookings(res.data.result))
    });
  }
}

export function book(book){
  return (dispatch) => {
    return axios.post('api/book', book).then(res => {
      dispatch(setBookings(res.data.result))
    });
  }
}

export function setSelectedResources(data){
  return {
    type: "UPDATE_SELECTED_RESOURCES",
    selectedResources: data
  }
}
